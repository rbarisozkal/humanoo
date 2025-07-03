import { useQuery } from "@tanstack/react-query";
import { getLowStockGroceries } from "../api";
import { Grocery } from "../types";
import { lowStockGroceriesCacheKey } from "../constants";

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