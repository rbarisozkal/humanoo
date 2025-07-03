import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { GroceryCategories } from "../constants";
import { GroceryFilters } from "../types";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const GroceryFilterPopover = ({
  filters,
  setFilters,
}: {
  filters: GroceryFilters;
  setFilters: (filters: GroceryFilters) => void;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<GroceryFilters>(filters);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const activeFiltersCount = Object.values(tempFilters).filter(Boolean).length;

  const handleFilterChange = (
    key: keyof GroceryFilters,
    value: string | number | undefined
  ) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setTempFilters({});
    setFilters({});
  };

  return (
    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Filter Groceries</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
                value={tempFilters.category || ""}
                onValueChange={(value) =>
                  handleFilterChange(
                    "category",
                    value === "all" ? undefined : value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {GroceryCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium">Min Price</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={tempFilters.minPrice ?? ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "minPrice",
                      e.target.value === ""
                        ? undefined
                        : parseFloat(e.target.value)
                    )
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Max Price</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="999.99"
                  value={tempFilters.maxPrice ?? ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxPrice",
                      e.target.value === ""
                        ? undefined
                        : parseFloat(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
