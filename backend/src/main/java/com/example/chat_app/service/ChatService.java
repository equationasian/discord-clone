package com.example.chat_app.service;

import com.example.chat_app.dto.MessageDTO;
import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.entity.Chatroom;
import com.example.chat_app.entity.Message;
import com.example.chat_app.repo.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChatService {
    private final MessageRepository messageRepository;
    private final UserService userService;
    private final ChatroomService chatroomService;

    public ChatService(MessageRepository messageRepository, UserService userService, ChatroomService chatroomService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.chatroomService = chatroomService;
    }

    @Transactional
    public MessageDTO saveMessage(MessageDTO message) {
        ChatUser user = userService.getUserById(message.getUser().getId());
        Chatroom chatroom = chatroomService.getChatroom(message.getChatroomId());
        Message saved = messageRepository.save(new Message(user, chatroom, message.getBody(), message.getTime()));

        chatroomService.addMessageToChatroom(saved);

        return new MessageDTO(saved);
    }
}