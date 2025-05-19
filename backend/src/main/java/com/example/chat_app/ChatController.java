package com.example.chat_app;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {
    @MessageMapping("/channel")
    @SendTo("/topic/channel")
    public String send(String message) {
        return message;
    }
}