package com.xdcoders.cravechat.controller;

import com.xdcoders.cravechat.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/chat.send")
    @SendTo("/topic/campus-chat")
    public ChatMessage broadcast(@Payload ChatMessage msg) {
        // Simple Anonymity: Mask the sender name on the fly
        msg.setSender("User_" + Math.abs(msg.getSender().hashCode() % 1000));
        return msg;
    }
}