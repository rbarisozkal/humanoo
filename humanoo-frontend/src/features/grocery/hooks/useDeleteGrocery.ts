import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteGrocery } from "../api";
import { groceriesCacheKey, lowStockGroceriesCacheKey } from "../constants";

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