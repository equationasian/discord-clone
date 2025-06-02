package com.example.chat_app.controller;

import com.example.chat_app.dto.MessageDTO;
import com.example.chat_app.entity.Message;
import com.example.chat_app.service.ChatService;
import com.example.chat_app.service.UserService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/channel")
    @SendTo("/topic/channel")
    public MessageDTO send(MessageDTO message) {
        return chatService.assignId(message);
    }
}