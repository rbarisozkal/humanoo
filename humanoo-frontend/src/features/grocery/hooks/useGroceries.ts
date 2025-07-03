import { useQuery } from "@tanstack/react-query";
import { getAllGroceries } from "../api";
import { Grocery } from "../types";
import { groceriesCacheKey } from "../constants";

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