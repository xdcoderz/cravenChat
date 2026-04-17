package com.xdcoders.cravechat.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "canteen_orders") // This prevents the 'order' keyword conflict
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private String items;
    private Double totalAmount;
    private String status;
}