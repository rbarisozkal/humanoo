package com.humanoo.grocery.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroceryUpdateRequest {
    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;

    @Min(value = 0, message = "Quantity must be non-negative")
    private Integer quantity;

    @Size(min = 1, max = 50, message = "Category must be between 1 and 50 characters")
    private String category;

    @Size(max = 20, message = "Unit must not exceed 20 characters")
    private String unit;
}