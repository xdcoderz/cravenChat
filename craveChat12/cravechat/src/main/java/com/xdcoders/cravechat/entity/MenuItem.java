package com.xdcoders.cravechat.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

// File: entity/MenuItem.java
@Entity
@Data
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private boolean isAvailable;
    private String aiTags; // e.g., "spicy, snack, vegan"
}