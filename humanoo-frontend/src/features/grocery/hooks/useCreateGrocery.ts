import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createGrocery } from "../api";
import { groceriesCacheKey, groceryCategoriesCacheKey, lowStockGroceriesCacheKey } from "../constants";

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