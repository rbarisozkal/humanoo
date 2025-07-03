"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GroceryForm } from "./GroceryForm";
interface CreateGroceryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGroceryDialog({
  open,
  onOpenChange,
}: CreateGroceryDialogProps) {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[38rem]">
        <DialogHeader>
          <DialogTitle>Add New Grocery Item</DialogTitle>
        </DialogHeader>
        <GroceryForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
