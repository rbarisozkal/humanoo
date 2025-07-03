"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GroceryForm } from "./GroceryForm";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { useGrocery } from "../hooks";

interface UpdateGroceryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groceryId: number | null;
}

export const UpdateGroceryDialog = ({
  open,
  onOpenChange,
  groceryId,
}: UpdateGroceryDialogProps) => {
  const { data: grocery, isLoading } = useGrocery(groceryId || 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Grocery Item</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : grocery ? (
          <GroceryForm
            grocery={grocery}
            onSuccess={() => onOpenChange(false)}
          />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Grocery item not found
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default UpdateGroceryDialog;
