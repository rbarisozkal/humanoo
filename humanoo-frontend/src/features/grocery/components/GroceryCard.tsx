"use client";

import { Grocery } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, AlertTriangle } from "lucide-react";

import { useDeleteGrocery } from "../hooks/useDeleteGrocery";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LOW_STOCK_THRESHOLD } from "../constants";

interface GroceryCardProps {
  grocery: Grocery;
  onEdit: () => void;
}

export function GroceryCard({ grocery, onEdit }: GroceryCardProps) {
  const { mutation: deleteGrocery } = useDeleteGrocery();

  const isLowStock = grocery.quantity <= LOW_STOCK_THRESHOLD;

  const handleDelete = () => {
    deleteGrocery.mutate(grocery.id);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{grocery.name}</CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Grocery Item</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &ldquo;{grocery.name}
                    &rdquo;? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={deleteGrocery.isPending}
                  >
                    {deleteGrocery.isPending ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {grocery.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${grocery.price.toFixed(2)}
          </span>
          <Badge variant="secondary">{grocery.category}</Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {grocery.quantity} {grocery.unit}
          </span>
          {isLowStock && (
            <Badge variant="destructive" className="text-xs text-white">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Low Stock
            </Badge>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          Updated {new Date(grocery.updatedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}
