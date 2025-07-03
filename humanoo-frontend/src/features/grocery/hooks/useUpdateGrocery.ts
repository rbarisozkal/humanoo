import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateGrocery } from "../api";
import { GroceryUpdateRequest } from "../types";
import { groceriesCacheKey, groceryCategoriesCacheKey, lowStockGroceriesCacheKey } from "../constants";

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