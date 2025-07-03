"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GroceryFilters } from "../types";
import { GroceryFilterPopover } from "./GroceryFilterPopover";

export const GrocerySearchFilter = ({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
  clearFilters,
}: {
  filters: GroceryFilters;
  setFilters: (filters: GroceryFilters) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}) => {
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== ""
  ).length;
  const hasActiveFilters = activeFiltersCount > 0 || searchQuery.length > 0;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search groceries..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <GroceryFilterPopover filters={filters} setFilters={setFilters} />

      <div className="flex gap-2">
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};
export default GrocerySearchFilter;
