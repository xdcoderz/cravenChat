package com.xdcoders.cravechat.controller;

import com.xdcoders.cravechat.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    @Autowired
    private AiService aiService;

    @GetMapping("/ask")
    public String askCraveBot(@RequestParam String query) {
        return aiService.getRecommendation(query);
    }
}