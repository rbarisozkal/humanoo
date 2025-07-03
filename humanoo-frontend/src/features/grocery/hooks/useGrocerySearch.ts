import { useQuery } from "@tanstack/react-query";
import { searchGroceriesByName } from "../api";
import { Grocery } from "../types";
import { grocerySearchCacheKey } from "../constants";

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