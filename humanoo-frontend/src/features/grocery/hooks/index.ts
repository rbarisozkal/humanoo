import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAllGroceries, getGroceryById, createGrocery, updateGrocery, deleteGrocery, searchGroceriesByName, filterGroceries, getLowStockGroceries, getCategories } from "../api";
import {
    GroceryUpdateRequest,
    GroceryFilters,
    GroceryCategory,
    Grocery
} from "../types";
import { groceriesCacheKey, groceryDetailCacheKey, grocerySearchCacheKey, groceryFilterCacheKey, lowStockGroceriesCacheKey, groceryCategoriesCacheKey } from "../constants";

export function useGroceries() {
    const result = useQuery({
        queryKey: [groceriesCacheKey],
        queryFn: getAllGroceries,
        staleTime: 0,
    });

    return {
        data: result.data as Grocery[] || [],
        isLoading: result.isLoading,
        isError: result.isError,
    };
}

export function useGrocery(id: number) {
    const result = useQuery({
        queryKey: [groceryDetailCacheKey(id)],
        queryFn: () => getGroceryById(id),
        enabled: !!id,
    });

    return {
        data: result.data as Grocery || null,
        isLoading: result.isLoading,
        isError: result.isError,
    };
}

export function useGrocerySearch(name: string) {
    const result = useQuery({
        queryKey: [grocerySearchCacheKey(name)],
        queryFn: () => searchGroceriesByName(name),
        enabled: name.length > 0,
        staleTime: 0,
    });

    return {
        data: result.data as Grocery[] || [],
        isLoading: result.isLoading,
        isError: result.isError,
    };
}

export function useGroceryFilter(filters: GroceryFilters) {
    const result = useQuery({
        queryKey: [groceryFilterCacheKey, filters],
        queryFn: () => filterGroceries(filters),
        enabled: Object.keys(filters).length > 0,
        staleTime: 0,
    });

    return {
        data: result.data as Grocery[] || [],
        isLoading: result.isLoading,
        isError: result.isError,
    };
}

export function useLowStockGroceries() {
    const result = useQuery({
        queryKey: [lowStockGroceriesCacheKey],
        queryFn: getLowStockGroceries,
        staleTime: 0,
    });

    return {
        data: result.data as Grocery[] || [],
        isLoading: result.isLoading,
        isError: result.isError,
    };
}

export function useGroceryCategories() {
    const result = useQuery({
        queryKey: [groceryCategoriesCacheKey],
        queryFn: getCategories,
        staleTime: 0,
    });

    return {
        data: result.data as GroceryCategory[] || [],
        isLoading: result.isLoading,
        isError: result.isError,
    };
}

export function useCreateGrocery() {
    const queryClient = useQueryClient();

    const result = useMutation({
        mutationFn: createGrocery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [groceriesCacheKey] });
            queryClient.invalidateQueries({ queryKey: [groceryCategoriesCacheKey] });
            queryClient.invalidateQueries({ queryKey: [lowStockGroceriesCacheKey] });
            toast.success("Grocery item created successfully!");
        },
        onError: (error: Error) => {
            const message = error.message || "Failed to create grocery item";
            toast.error(message);
        },
    });

    return {
        mutation: result,
        isLoading: result.isPending,
        isError: result.isError,
    };
}

export function useUpdateGrocery() {
    const queryClient = useQueryClient();

    const result = useMutation({
        mutationFn: ({ id, data }: { id: number; data: GroceryUpdateRequest }) =>
            updateGrocery(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [groceriesCacheKey] });
            queryClient.invalidateQueries({ queryKey: [lowStockGroceriesCacheKey] });
            queryClient.invalidateQueries({ queryKey: [groceryCategoriesCacheKey] });
            toast.success("Grocery item updated successfully!");
        },
        onError: (error: Error) => {
            const message = error.message || "Failed to update grocery item";
            toast.error(message);
        },
    });

    return {
        mutation: result,
        isLoading: result.isPending,
        isError: result.isError,
    };
}

export function useDeleteGrocery() {
    const queryClient = useQueryClient();

    const result = useMutation({
        mutationFn: deleteGrocery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [lowStockGroceriesCacheKey] });
            queryClient.invalidateQueries({ queryKey: [groceriesCacheKey] });
            toast.success("Grocery item deleted successfully!");
        },
        onError: (error: Error) => {
            const message = error.message || "Failed to delete grocery item";
            toast.error(message);
        },
    });

    return {
        mutation: result,
        isLoading: result.isPending,
        isError: result.isError,
    };
} 