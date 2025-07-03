"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { useCreateGrocery } from "../hooks/useCreateGrocery";
import { useUpdateGrocery } from "../hooks/useUpdateGrocery";
import { GroceryCategories, GroceryUnits } from "../constants";
import { Grocery } from "../types";

const grocerySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  quantity: z.number().int().min(0, "Quantity must be non-negative"),
  category: z.string().min(1, "Category is required"),
  unit: z.string().min(1, "Unit is required"),
});

type GroceryFormData = z.infer<typeof grocerySchema>;

interface GroceryFormProps {
  grocery?: Grocery;
  onSuccess?: () => void;
}

export const GroceryForm = ({ grocery, onSuccess }: GroceryFormProps) => {
  const isEditing = !!grocery;
  const { mutation: createGrocery } = useCreateGrocery();
  const { mutation: updateGrocery } = useUpdateGrocery();

  const form = useForm<GroceryFormData>({
    resolver: zodResolver(grocerySchema),
    defaultValues: {
      name: grocery?.name || "",
      description: grocery?.description || "",
      price: grocery?.price || 0,
      quantity: grocery?.quantity || 0,
      category: grocery?.category || "",
      unit: grocery?.unit || "",
    },
  });

  const onSubmit = (data: GroceryFormData) => {
    if (isEditing)
      updateGrocery.mutate({ id: grocery.id, data }, { onSuccess });
    else createGrocery.mutate(data, { onSuccess });
  };

  const isLoading = createGrocery.isPending || updateGrocery.isPending;

  const quantityChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    form.setValue("quantity", isNaN(value) ? 0 : value);
  };

  const priceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    form.setValue("price", isNaN(value) ? 0 : value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter grocery name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GroceryCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    lang="en-US"
                    placeholder="0.00"
                    value={field.value || ""}
                    onChange={priceChangeHandler}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    lang="en-US"
                    placeholder="0"
                    value={field.value || ""}
                    onChange={quantityChangeHandler}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GroceryUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="min-w-24">
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : isEditing ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default GroceryForm;
