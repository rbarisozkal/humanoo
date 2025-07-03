import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api";
import { GroceryCategory } from "../types";
import { groceryCategoriesCacheKey } from "../constants";

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