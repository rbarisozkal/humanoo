import { GroceryCategory, GroceryUnit } from "../types";

export const GroceryCategories: { value: GroceryCategory; label: string }[] = [
    { value: "FRUITS", label: "Fruits" },
    { value: "VEGETABLES", label: "Vegetables" },
    { value: "DAIRY", label: "Dairy" },
    { value: "MEAT", label: "Meat" },
    { value: "GRAINS", label: "Grains" },
    { value: "BEVERAGES", label: "Beverages" },
    { value: "SNACKS", label: "Snacks" },
    { value: "FROZEN", label: "Frozen" },
    { value: "HOUSEHOLD", label: "Household" },
    { value: "OTHER", label: "Other" },
];

export const GroceryUnits: { value: GroceryUnit; label: string }[] = [
    { value: "KG", label: "Kilogram" },
    { value: "G", label: "Gram" },
    { value: "L", label: "Liter" },
    { value: "ML", label: "Milliliter" },
    { value: "LB", label: "Pound" },
    { value: "PIECES", label: "Pieces" },
    { value: "PACKS", label: "Packs" },
    { value: "BOX", label: "Box" },
    { value: "BAG", label: "Bag" },
    { value: "BOTTLE", label: "Bottle" },
    { value: "CONTAINER", label: "Container" },
    { value: "GALLON", label: "Gallon" },
    { value: "LOAF", label: "Loaf" },
];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const apiUrls = {
    groceries: "/api/groceries",
    searchGroceries: "/api/groceries/search",
    filterGroceries: "/api/groceries/filter",
    lowStockGroceries: "/api/groceries/low-stock",
    categories: "/api/groceries/categories",
};

export const groceriesCacheKey = "groceries";
export const groceryDetailCacheKey = (id: number) => `grocery-${id}`;
export const grocerySearchCacheKey = (query: string) => `grocery-search-${query}`;
export const groceryFilterCacheKey = "grocery-filter";
export const lowStockGroceriesCacheKey = "low-stock-groceries";
export const groceryCategoriesCacheKey = "grocery-categories";


export const LOW_STOCK_THRESHOLD = 10; 