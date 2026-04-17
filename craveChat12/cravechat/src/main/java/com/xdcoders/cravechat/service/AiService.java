package com.xdcoders.cravechat.service;

import com.xdcoders.cravechat.entity.MenuItem;
import com.xdcoders.cravechat.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AiService {

    @Autowired
    private MenuRepository menuRepository;

    public String getRecommendation(String userQuery) {
        List<MenuItem> items = menuRepository.findAll();

        // This is where you'd normally call the Gemini API.
        // For the prototype demo, we use "Prompt Logic" to simulate the AI:
        String menuContext = items.stream()
                .map(i -> i.getName() + " (₹" + i.getPrice() + ") - Tags: " + i.getAiTags())
                .collect(Collectors.joining(", "));

        if (userQuery.toLowerCase().contains("spicy")) {
            return "Crave-Bot: I recommend the Samosas! They are our most popular spicy snack today.";
        } else if (userQuery.toLowerCase().contains("cheese")) {
            return "Crave-Bot: You should definitely try the Cheese Maggi. It's hot and cheesy!";
        } else {
            return "Crave-Bot: Based on the menu, the Cold Coffee is a great choice to pair with any snack!";
        }
    }
}