"use client";

import { useMemo } from "react";
import { GroceryCard } from "./GroceryCard";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { EmptyState } from "@/components/custom/EmptyState";
import { useGroceries, useGrocerySearch, useGroceryFilter } from "../hooks";
import { Grocery } from "../types";
import { GroceryFilters } from "../types";
import { useRouter } from "next/navigation";

interface GroceryListProps {
  onEditGrocery: (id: number) => void;
  filters: GroceryFilters;
  searchQuery: string;
}

export const GroceryList = ({
  onEditGrocery,
  filters,
  searchQuery,
}: GroceryListProps) => {
  const router = useRouter();

  const hasSearch = searchQuery.length > 0;
  const hasFilters = Object.keys(filters).length > 0;

  const groceriesQuery = useGroceries();
  const searchQuery_ = useGrocerySearch(searchQuery);
  const filterQuery = useGroceryFilter(filters);

  const {
    data: groceries,
    isLoading,
    isError,
  } = useMemo(() => {
    if (hasSearch) {
      return searchQuery_;
    } else if (hasFilters) {
      return filterQuery;
    } else {
      return groceriesQuery;
    }
  }, [hasSearch, hasFilters, searchQuery_, filterQuery, groceriesQuery]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleRetry = () => {
    router.refresh();
  };

  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        description="Failed to load groceries. Please try again."
        actionLabel="Retry"
        onAction={handleRetry}
      />
    );
  }

  if (!groceries || groceries.length === 0) {
    if (hasSearch || hasFilters) {
      return (
        <EmptyState
          title="No groceries found"
          description="Try adjusting your search terms or filters."
        />
      );
    }

    return (
      <EmptyState
        title="No groceries yet"
        description="Start building your grocery inventory by adding your first item."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {groceries.map((grocery: Grocery) => (
        <GroceryCard
          key={grocery.id}
          grocery={grocery}
          onEdit={() => onEditGrocery(grocery.id)}
        />
      ))}
    </div>
  );
};
export default GroceryList;
