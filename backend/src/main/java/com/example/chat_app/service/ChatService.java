package com.example.chat_app.service;

import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.entity.Message;
import com.example.chat_app.repo.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    private final MessageRepository messageRepository;

    public ChatService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message assignId(Message message) {
        Message saved = messageRepository.save(message);
        System.out.println(saved);
        return saved;
        //return messageRepository.save(message);
    }
}