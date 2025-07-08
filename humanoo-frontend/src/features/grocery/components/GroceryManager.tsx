"use client";

import { useState } from "react";
import { Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLowStockGroceries } from "../hooks/useLowStockGroceries";
import { GrocerySearchFilter } from "./GrocerySearchFilter";
import { GroceryList } from "./GroceryList";
import { CreateGroceryDialog } from "./CreateGroceryDialog";
import { GroceryFilters } from "../types";

export const GroceryManager = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [filters, setFilters] = useState<GroceryFilters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  const { data: lowStockItems } = useLowStockGroceries();

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Grocery Management
          </h1>
          <p className="text-muted-foreground">
            Manage your grocery inventory with ease
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Grocery
        </Button>
      </div>

      {lowStockItems && lowStockItems.length > 0 && (
        <Card className="border-destructive">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-destructive">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              The following items are running low on stock:
            </p>
            <div className="flex flex-wrap gap-2">
              {lowStockItems.map((item) => (
                <Badge
                  key={item.id}
                  variant="destructive"
                  className="text-xs text-white"
                >
                  {item.name} ({item.quantity} {item.unit})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <GrocerySearchFilter
        filters={filters}
        setFilters={setFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        clearFilters={clearFilters}
      />
      <GroceryList
        filters={filters}
        searchQuery={searchQuery}
      />
      <CreateGroceryDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};
export default GroceryManager;
