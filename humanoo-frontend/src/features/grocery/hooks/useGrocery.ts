import { useQuery } from "@tanstack/react-query";
import { getGroceryById } from "../api";
import { Grocery } from "../types";
import { groceryDetailCacheKey } from "../constants";

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