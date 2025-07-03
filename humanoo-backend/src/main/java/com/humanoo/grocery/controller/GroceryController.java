package com.humanoo.grocery.controller;

import com.humanoo.grocery.dto.GroceryCreateRequest;
import com.humanoo.grocery.dto.GroceryResponse;
import com.humanoo.grocery.dto.GroceryUpdateRequest;
import com.humanoo.grocery.service.GroceryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/groceries")
@CrossOrigin(origins = "http://localhost:3000") // I used this to allow cross-origin requests from the frontend
public class GroceryController {

    private final GroceryService groceryService;

    @Autowired
    public GroceryController(GroceryService groceryService) {
        this.groceryService = groceryService;
    }

    @PostMapping
    public ResponseEntity<GroceryResponse> createGrocery(@Valid @RequestBody GroceryCreateRequest request) {
        try {
            GroceryResponse response = groceryService.createGrocery(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<GroceryResponse>> getAllGroceries() {
        List<GroceryResponse> groceries = groceryService.getAllGroceries();
        return ResponseEntity.ok(groceries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroceryResponse> getGroceryById(@PathVariable Long id) {
        Optional<GroceryResponse> grocery = groceryService.getGroceryById(id);
        return grocery.map(response -> ResponseEntity.ok(response))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroceryResponse> updateGrocery(@PathVariable Long id,
            @Valid @RequestBody GroceryUpdateRequest request) {
        try {
            GroceryResponse response = groceryService.updateGrocery(id, request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrocery(@PathVariable Long id) {
        try {
            groceryService.deleteGrocery(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<GroceryResponse>> searchGroceries(@RequestParam String name) {
        List<GroceryResponse> groceries = groceryService.searchGroceriesByName(name);
        return ResponseEntity.ok(groceries);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<GroceryResponse>> getGroceriesByCategory(@PathVariable String category) {
        List<GroceryResponse> groceries = groceryService.getGroceriesByCategory(category);
        return ResponseEntity.ok(groceries);
    }

    @GetMapping("/price-range")
    public ResponseEntity<List<GroceryResponse>> getGroceriesByPriceRange(
            @RequestParam BigDecimal minPrice,
            @RequestParam BigDecimal maxPrice) {
        List<GroceryResponse> groceries = groceryService.getGroceriesByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(groceries);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<GroceryResponse>> filterGroceries(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {

        List<GroceryResponse> groceries;

        if (category != null && minPrice != null && maxPrice != null) {
            groceries = groceryService.filterGroceries(category, minPrice, maxPrice);
        } else if (category != null && minPrice != null) {
            groceries = groceryService.filterGroceries(category, minPrice, new BigDecimal("999999"));
        } else if (category != null && maxPrice != null) {
            groceries = groceryService.filterGroceries(category, new BigDecimal("0"), maxPrice);
        } else if (category != null) {
            groceries = groceryService.getGroceriesByCategory(category);
        } else if (minPrice != null && maxPrice != null) {
            groceries = groceryService.getGroceriesByPriceRange(minPrice, maxPrice);
        } else if (minPrice != null) {
            groceries = groceryService.getGroceriesByPriceRange(minPrice, new BigDecimal("999999"));
        } else if (maxPrice != null) {
            groceries = groceryService.getGroceriesByPriceRange(new BigDecimal("0"), maxPrice);
        } else {
            groceries = groceryService.getAllGroceries();
        }

        return ResponseEntity.ok(groceries);
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<GroceryResponse>> getLowStockGroceries(
            @RequestParam(required = false, defaultValue = "10") Integer threshold) {
        List<GroceryResponse> groceries = groceryService.getLowStockGroceries(threshold);
        return ResponseEntity.ok(groceries);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = groceryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}