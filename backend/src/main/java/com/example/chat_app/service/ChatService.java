package com.example.chat_app.service;

import com.example.chat_app.dto.MessageDTO;
import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.entity.Message;
import com.example.chat_app.repo.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    private final MessageRepository messageRepository;
    private final UserService userService;

    public ChatService(MessageRepository messageRepository, UserService userService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
    }

    public MessageDTO assignId(MessageDTO message) {
        ChatUser user = userService.getUserById(message.getUser().getId());
        Message saved = messageRepository.save(new Message(user, message.getBody(), message.getTime()));

        return new MessageDTO(saved);
    }
}