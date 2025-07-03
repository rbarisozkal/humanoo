package com.humanoo.grocery.service;

import com.humanoo.grocery.dto.GroceryCreateRequest;
import com.humanoo.grocery.dto.GroceryResponse;
import com.humanoo.grocery.dto.GroceryUpdateRequest;
import com.humanoo.grocery.model.Grocery;
import com.humanoo.grocery.repository.GroceryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroceryService {

    private final GroceryRepository groceryRepository;

    @Autowired
    public GroceryService(GroceryRepository groceryRepository) {
        this.groceryRepository = groceryRepository;
    }

    public GroceryResponse createGrocery(GroceryCreateRequest request) {
        if (groceryRepository.existsByNameIgnoreCase(request.getName())) {
            throw new IllegalArgumentException("Grocery with name '" + request.getName() + "' already exists");
        }

        Grocery grocery = Grocery.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .category(request.getCategory())
                .unit(request.getUnit())
                .build();

        Grocery savedGrocery = groceryRepository.save(grocery);
        return mapToResponse(savedGrocery);
    }

    public List<GroceryResponse> getAllGroceries() {
        return groceryRepository.findAllByOrderByUpdatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public Optional<GroceryResponse> getGroceryById(Long id) {
        return groceryRepository.findById(id)
                .map(this::mapToResponse);
    }

    public GroceryResponse updateGrocery(Long id, GroceryUpdateRequest request) {
        Grocery grocery = groceryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Grocery not found with id: " + id));

        if (request.getName() != null && !request.getName().equals(grocery.getName())) {
            if (groceryRepository.existsByNameIgnoreCase(request.getName())) {
                throw new IllegalArgumentException("Grocery with name '" + request.getName() + "' already exists");
            }
            grocery.setName(request.getName());
        }
        if (request.getDescription() != null) {
            grocery.setDescription(request.getDescription());
        }
        if (request.getPrice() != null) {
            grocery.setPrice(request.getPrice());
        }
        if (request.getQuantity() != null) {
            grocery.setQuantity(request.getQuantity());
        }
        if (request.getCategory() != null) {
            grocery.setCategory(request.getCategory());
        }
        if (request.getUnit() != null) {
            grocery.setUnit(request.getUnit());
        }

        Grocery updatedGrocery = groceryRepository.save(grocery);
        return mapToResponse(updatedGrocery);
    }

    public void deleteGrocery(Long id) {
        if (!groceryRepository.existsById(id)) {
            throw new IllegalArgumentException("Grocery not found with id: " + id);
        }
        groceryRepository.deleteById(id);
    }

    public List<GroceryResponse> searchGroceriesByName(String name) {
        return groceryRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .sorted((a, b) -> b.getUpdatedAt().compareTo(a.getUpdatedAt()))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<GroceryResponse> getGroceriesByCategory(String category) {
        return groceryRepository.findByCategoryOrderByUpdatedAtDesc(category)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<GroceryResponse> getGroceriesByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return groceryRepository.findByPriceBetweenOrderByUpdatedAtDesc(minPrice, maxPrice)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<GroceryResponse> filterGroceries(String category, BigDecimal minPrice, BigDecimal maxPrice) {
        return groceryRepository.findByCategoryAndPriceBetweenOrderByUpdatedAtDesc(category, minPrice, maxPrice)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<GroceryResponse> getLowStockGroceries(Integer threshold) {
        return groceryRepository.findLowStockGroceries(threshold)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<String> getAllCategories() {
        return groceryRepository.findAllCategories();
    }

    private GroceryResponse mapToResponse(Grocery grocery) {
        return GroceryResponse.builder()
                .id(grocery.getId())
                .name(grocery.getName())
                .description(grocery.getDescription())
                .price(grocery.getPrice())
                .quantity(grocery.getQuantity())
                .category(grocery.getCategory())
                .unit(grocery.getUnit())
                .createdAt(grocery.getCreatedAt())
                .updatedAt(grocery.getUpdatedAt())
                .build();
    }
}