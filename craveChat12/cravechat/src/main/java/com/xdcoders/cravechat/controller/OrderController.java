package com.xdcoders.cravechat.controller;

import com.xdcoders.cravechat.entity.Order;
import com.xdcoders.cravechat.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate; // The "Megaphone"

    @PostMapping("/place")
    public Order placeOrder(@RequestBody Order order) {
        order.setStatus("PENDING");
        Order savedOrder = orderRepository.save(order);

        // This is the magic line: It pushes the new order to the Admin Dashboard instantly
        messagingTemplate.convertAndSend("/topic/orders", savedOrder);

        return savedOrder;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}