package com.humanoo.grocery.service;

import com.humanoo.grocery.dto.GroceryCreateRequest;
import com.humanoo.grocery.dto.GroceryResponse;
import com.humanoo.grocery.dto.GroceryUpdateRequest;
import com.humanoo.grocery.model.Grocery;
import com.humanoo.grocery.repository.GroceryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GroceryServiceTest {

    @Mock
    private GroceryRepository groceryRepository;

    @InjectMocks
    private GroceryService groceryService;

    private Grocery testGrocery;

    @BeforeEach
    void setUp() {
        testGrocery = new Grocery();
        testGrocery.setId(1L);
        testGrocery.setName("Test Apple");
        testGrocery.setDescription("Fresh red apple");
        testGrocery.setPrice(new BigDecimal("2.99"));
        testGrocery.setQuantity(10);
        testGrocery.setCategory("FRUITS");
        testGrocery.setUnit("KG");
    }

    @Test
    void getAllGroceries_ShouldReturnAllGroceries() {
        List<Grocery> groceries = List.of(testGrocery);
        when(groceryRepository.findAllByOrderByUpdatedAtDesc()).thenReturn(groceries);

        List<GroceryResponse> result = groceryService.getAllGroceries();

        assertEquals(1, result.size());
        assertEquals(testGrocery.getName(), result.get(0).getName());
        verify(groceryRepository).findAllByOrderByUpdatedAtDesc();
    }

    @Test
    void getGroceryById_ShouldReturnGrocery_WhenExists() {
        when(groceryRepository.findById(1L)).thenReturn(Optional.of(testGrocery));

        Optional<GroceryResponse> result = groceryService.getGroceryById(1L);

        assertTrue(result.isPresent());
        assertEquals(testGrocery.getName(), result.get().getName());
        verify(groceryRepository).findById(1L);
    }

    @Test
    void getGroceryById_ShouldReturnEmpty_WhenNotExists() {
        when(groceryRepository.findById(anyLong())).thenReturn(Optional.empty());

        Optional<GroceryResponse> result = groceryService.getGroceryById(999L);

        assertFalse(result.isPresent());
        verify(groceryRepository).findById(999L);
    }

    @Test
    void createGrocery_ShouldSaveAndReturnGrocery() {
        GroceryCreateRequest request = new GroceryCreateRequest();
        request.setName("New Apple");
        request.setDescription("Fresh apple");
        request.setPrice(new BigDecimal("3.99"));
        request.setQuantity(15);
        request.setCategory("FRUITS");
        request.setUnit("KG");

        when(groceryRepository.existsByNameIgnoreCase(anyString())).thenReturn(false);
        when(groceryRepository.save(any(Grocery.class))).thenReturn(testGrocery);

        GroceryResponse result = groceryService.createGrocery(request);

        assertNotNull(result);
        assertEquals(testGrocery.getName(), result.getName());
        verify(groceryRepository).save(any(Grocery.class));
    }

    @Test
    void updateGrocery_ShouldUpdateAndReturnGrocery_WhenExists() {
        GroceryUpdateRequest request = new GroceryUpdateRequest();
        request.setName("Updated Apple");
        request.setPrice(new BigDecimal("4.99"));

        when(groceryRepository.findById(1L)).thenReturn(Optional.of(testGrocery));
        when(groceryRepository.existsByNameIgnoreCase(anyString())).thenReturn(false);
        when(groceryRepository.save(any(Grocery.class))).thenReturn(testGrocery);

        GroceryResponse result = groceryService.updateGrocery(1L, request);

        assertNotNull(result);
        assertEquals(testGrocery.getName(), result.getName());
        verify(groceryRepository).findById(1L);
        verify(groceryRepository).save(any(Grocery.class));
    }

    @Test
    void deleteGrocery_ShouldDeleteSuccessfully_WhenExists() {
        when(groceryRepository.existsById(1L)).thenReturn(true);

        assertDoesNotThrow(() -> groceryService.deleteGrocery(1L));
        verify(groceryRepository).existsById(1L);
        verify(groceryRepository).deleteById(1L);
    }

    @Test
    void deleteGrocery_ShouldThrowException_WhenNotExists() {
        when(groceryRepository.existsById(1L)).thenReturn(false);

        assertThrows(IllegalArgumentException.class, () -> groceryService.deleteGrocery(1L));
        verify(groceryRepository).existsById(1L);
        verify(groceryRepository, never()).deleteById(anyLong());
    }
}