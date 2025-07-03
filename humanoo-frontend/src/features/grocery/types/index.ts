export interface Grocery {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    unit: string;
    createdAt: string;
    updatedAt: string;
}

export interface GroceryCreateRequest {
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    unit: string;
}

export interface GroceryUpdateRequest {
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    category?: string;
    unit?: string;
}

export interface GroceryFilters {
    category?: string;
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    lowStock?: boolean;
}

export type GroceryCategory =
    | "FRUITS"
    | "VEGETABLES"
    | "DAIRY"
    | "MEAT"
    | "GRAINS"
    | "BEVERAGES"
    | "SNACKS"
    | "FROZEN"
    | "HOUSEHOLD"
    | "OTHER";

export type GroceryUnit =
    | "KG"
    | "G"
    | "L"
    | "ML"
    | "LB"
    | "PIECES"
    | "PACKS"
    | "BOX"
    | "BAG"
    | "BOTTLE"
    | "CONTAINER"
    | "GALLON"
    | "LOAF"; 