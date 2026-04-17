package com.xdcoders.cravechat.controller;

import com.xdcoders.cravechat.entity.MenuItem;
import com.xdcoders.cravechat.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*") // Allows your React frontend to talk to this backend
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return menuRepository.findAll();
    }

    @GetMapping("/available")
    public List<MenuItem> getAvailableItems() {
        // Students only care about what they can actually buy right now
        return menuRepository.findAll().stream()
                .filter(MenuItem::isAvailable)
                .toList();
    }
}