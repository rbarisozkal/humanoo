package com.humanoo.grocery.config;

import com.humanoo.grocery.model.Grocery;
import com.humanoo.grocery.repository.GroceryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private final GroceryRepository groceryRepository;

    @Autowired
    public DataSeeder(GroceryRepository groceryRepository) {
        this.groceryRepository = groceryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (groceryRepository.count() == 0) {
            seedGroceries();
        }
    }

    private void seedGroceries() {
        // we use Builder pattern to create Grocery objects. (just wanted to show you
        // how we use a design pattern)
        groceryRepository.save(Grocery.builder().name("Bananas").description("Fresh yellow bananas")
                .price(new BigDecimal("2.99")).quantity(50).category("FRUITS").unit("LB").build());
        groceryRepository.save(Grocery.builder().name("Apples").description("Red delicious apples")
                .price(new BigDecimal("3.49")).quantity(30).category("FRUITS").unit("LB").build());
        groceryRepository.save(Grocery.builder().name("Oranges").description("Juicy navel oranges")
                .price(new BigDecimal("4.99")).quantity(25).category("FRUITS").unit("LB").build());

        groceryRepository.save(Grocery.builder().name("Carrots").description("Fresh organic carrots")
                .price(new BigDecimal("1.99")).quantity(40).category("VEGETABLES").unit("LB").build());
        groceryRepository.save(Grocery.builder().name("Broccoli").description("Fresh green broccoli")
                .price(new BigDecimal("2.49")).quantity(20).category("VEGETABLES").unit("LB").build());
        groceryRepository.save(Grocery.builder().name("Tomatoes").description("Roma tomatoes")
                .price(new BigDecimal("3.99")).quantity(35).category("VEGETABLES").unit("LB").build());

        groceryRepository.save(Grocery.builder().name("Milk").description("Whole milk 1 gallon")
                .price(new BigDecimal("3.99")).quantity(15).category("DAIRY").unit("GALLON").build());
        groceryRepository.save(Grocery.builder().name("Cheese").description("Cheddar cheese block")
                .price(new BigDecimal("5.99")).quantity(12).category("DAIRY").unit("LB").build());
        groceryRepository.save(Grocery.builder().name("Yogurt").description("Greek yogurt")
                .price(new BigDecimal("1.99")).quantity(25).category("DAIRY").unit("CONTAINER").build());

        groceryRepository.save(Grocery.builder().name("Bread").description("Whole wheat bread")
                .price(new BigDecimal("2.99")).quantity(20).category("GRAINS").unit("LOAF").build());
        groceryRepository.save(Grocery.builder().name("Rice").description("Jasmine rice").price(new BigDecimal("4.99"))
                .quantity(10).category("GRAINS").unit("BAG").build());
        groceryRepository.save(Grocery.builder().name("Pasta").description("Spaghetti pasta")
                .price(new BigDecimal("1.49")).quantity(30).category("GRAINS").unit("BOX").build());

        groceryRepository.save(Grocery.builder().name("Chicken Breast").description("Boneless chicken breast")
                .price(new BigDecimal("7.99")).quantity(8).category("MEAT").unit("LB").build());
        groceryRepository.save(Grocery.builder().name("Ground Beef").description("85% lean ground beef")
                .price(new BigDecimal("6.99")).quantity(10).category("MEAT").unit("LB").build());
        groceryRepository.save(Grocery.builder().name("Salmon").description("Fresh Atlantic salmon")
                .price(new BigDecimal("12.99")).quantity(5).category("MEAT").unit("LB").build());

        System.out.println("Seeded grocery database with initial data");
    }
}