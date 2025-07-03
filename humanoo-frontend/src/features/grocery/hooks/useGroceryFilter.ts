import { useQuery } from "@tanstack/react-query";
import { filterGroceries } from "../api";
import { Grocery, GroceryFilters } from "../types";
import { groceryFilterCacheKey } from "../constants";

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