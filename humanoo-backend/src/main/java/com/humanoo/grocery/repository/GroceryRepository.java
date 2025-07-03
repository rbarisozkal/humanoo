package com.humanoo.grocery.repository;

import com.humanoo.grocery.model.Grocery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface GroceryRepository extends JpaRepository<Grocery, Long> {

    List<Grocery> findByCategory(String category);

    List<Grocery> findByNameContainingIgnoreCase(String name);

    List<Grocery> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    List<Grocery> findByCategoryAndPriceBetween(String category, BigDecimal minPrice, BigDecimal maxPrice);

    @Query("SELECT g FROM Grocery g WHERE g.quantity < :threshold")
    List<Grocery> findLowStockGroceries(@Param("threshold") Integer threshold);

    @Query("SELECT DISTINCT g.category FROM Grocery g ORDER BY g.category")
    List<String> findAllCategories();

    boolean existsByNameIgnoreCase(String name);

    Optional<Grocery> findByNameIgnoreCase(String name);

    @Query("SELECT COUNT(g) FROM Grocery g WHERE g.category = :category")
    Long countByCategory(@Param("category") String category);

    List<Grocery> findAllByOrderByUpdatedAtDesc();

    List<Grocery> findByCategoryOrderByUpdatedAtDesc(String category);

    List<Grocery> findByPriceBetweenOrderByUpdatedAtDesc(BigDecimal minPrice, BigDecimal maxPrice);

    List<Grocery> findByCategoryAndPriceBetweenOrderByUpdatedAtDesc(String category, BigDecimal minPrice,
            BigDecimal maxPrice);
}