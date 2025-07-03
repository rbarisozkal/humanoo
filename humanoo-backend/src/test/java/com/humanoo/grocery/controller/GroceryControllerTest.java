package com.humanoo.grocery.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.humanoo.grocery.dto.GroceryCreateRequest;
import com.humanoo.grocery.dto.GroceryResponse;
import com.humanoo.grocery.service.GroceryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GroceryController.class)
class GroceryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GroceryService groceryService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllGroceries_ShouldReturnGroceries() throws Exception {
        GroceryResponse grocery = GroceryResponse.builder()
                .id(1L)
                .name("Test Apple")
                .description("Fresh apple")
                .price(new BigDecimal("2.99"))
                .quantity(10)
                .category("FRUITS")
                .unit("KG")
                .build();

        when(groceryService.getAllGroceries()).thenReturn(List.of(grocery));

        mockMvc.perform(get("/api/groceries"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Test Apple"))
                .andExpect(jsonPath("$[0].price").value(2.99))
                .andExpect(jsonPath("$[0].category").value("FRUITS"));
    }

    @Test
    void getGroceryById_ShouldReturnGrocery_WhenExists() throws Exception {
        GroceryResponse grocery = GroceryResponse.builder()
                .id(1L)
                .name("Test Apple")
                .price(new BigDecimal("2.99"))
                .build();

        when(groceryService.getGroceryById(1L)).thenReturn(Optional.of(grocery));

        mockMvc.perform(get("/api/groceries/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Apple"))
                .andExpect(jsonPath("$.price").value(2.99));
    }

    @Test
    void getGroceryById_ShouldReturnNotFound_WhenNotExists() throws Exception {
        when(groceryService.getGroceryById(anyLong())).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/groceries/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void createGrocery_ShouldReturnCreatedGrocery() throws Exception {
        GroceryCreateRequest request = new GroceryCreateRequest();
        request.setName("New Apple");
        request.setDescription("Fresh apple");
        request.setPrice(new BigDecimal("3.99"));
        request.setQuantity(15);
        request.setCategory("FRUITS");
        request.setUnit("KG");

        GroceryResponse response = GroceryResponse.builder()
                .id(1L)
                .name("New Apple")
                .description("Fresh apple")
                .price(new BigDecimal("3.99"))
                .quantity(15)
                .category("FRUITS")
                .unit("KG")
                .build();

        when(groceryService.createGrocery(any(GroceryCreateRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/groceries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("New Apple"))
                .andExpect(jsonPath("$.price").value(3.99));
    }

    @Test
    void deleteGrocery_ShouldReturnNoContent_WhenExists() throws Exception {

        mockMvc.perform(delete("/api/groceries/1"))
                .andExpect(status().isNoContent());
    }
}