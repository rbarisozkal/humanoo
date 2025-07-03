import axios from "axios";
import {
    Grocery,
    GroceryCreateRequest,
    GroceryUpdateRequest,
    GroceryFilters
} from "../types";
import { API_BASE_URL, apiUrls } from "../constants";

// we can also customize the axios instance to add a custom interceptor for error handling
// but for now I used the default axios instance to not complicate the code

export const getAllGroceries = async (): Promise<Grocery[]> => {
    const response = await axios.get(`${API_BASE_URL}${apiUrls.groceries}`);
    return response.data;
}
export const getGroceryById = async (id: number): Promise<Grocery> => {
    const response = await axios.get(`${API_BASE_URL}${apiUrls.groceries}/${id}`);
    return response.data;
}
export const createGrocery = async (grocery: GroceryCreateRequest): Promise<Grocery> => {
    const response = await axios.post(`${API_BASE_URL}${apiUrls.groceries}`, grocery);
    return response.data;
}
export const updateGrocery = async (id: number, grocery: GroceryUpdateRequest): Promise<Grocery> => {
    const response = await axios.put(`${API_BASE_URL}${apiUrls.groceries}/${id}`, grocery);
    return response.data;
}

export const deleteGrocery = async (id: number): Promise<void> => {
    const response = await axios.delete(`${API_BASE_URL}${apiUrls.groceries}/${id}`);
    return response.data;
}

export const searchGroceriesByName = async (name: string): Promise<Grocery[]> => {
    const response = await axios.get(`${API_BASE_URL}${apiUrls.searchGroceries}?name=${encodeURIComponent(name)}`);
    return response.data;
}

export const filterGroceries = async (filters: GroceryFilters): Promise<Grocery[]> => {
    const response = await axios.get(`${API_BASE_URL}${apiUrls.filterGroceries}?${new URLSearchParams(filters as Record<string, string>).toString()}`);
    return response.data;
}

export const getLowStockGroceries = async (): Promise<Grocery[]> => {
    const response = await axios.get(`${API_BASE_URL}${apiUrls.lowStockGroceries}`);
    return response.data;
}
export const getCategories = async (): Promise<string[]> => {
    const response = await axios.get(`${API_BASE_URL}${apiUrls.categories}`);
    return response.data;
}