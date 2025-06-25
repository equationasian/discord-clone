package com.example.chat_app.service;

import com.example.chat_app.dto.ChatUserDTO;
import com.example.chat_app.dto.ChatroomDTO;
import com.example.chat_app.dto.MessageDTO;
import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.entity.Chatroom;
import com.example.chat_app.entity.Message;
import com.example.chat_app.repo.ChatroomRepository;
import com.example.chat_app.request.ChatUserDetails;
import com.example.chat_app.request.ChatroomRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ChatroomService {
    private final static Logger log = LoggerFactory.getLogger(ChatroomService.class);

    private final ChatroomRepository chatroomRepository;
    private final UserService userService;

    public ChatroomService(ChatroomRepository chatroomRepository, UserService userService) {
        this.chatroomRepository = chatroomRepository;
        this.userService = userService;
    }

    public Chatroom getChatroom(Long id) {
        return chatroomRepository.findById(id).orElseThrow();
    }

    public List<ChatroomDTO> getAllGroupChatrooms() {
        ChatUser user = userService.getAuthenticatedUser();
        return userService.getAllGroupChatrooms(user.getId());
    }

    public List<ChatroomDTO> getAllDirectChatrooms() {
        ChatUser user = userService.getAuthenticatedUser();
        return userService.getAllDirectChatrooms(user.getId());
    }

    @Transactional
    public List<ChatUserDTO> getMembers(Long id) {
        Chatroom chatroom = chatroomRepository.findById(id).orElseThrow();
        return chatroom.getMembers().stream().map(ChatUserDTO::new).toList();
    }

    @Transactional
    public List<MessageDTO> getMessages(Long id) {
        Chatroom chatroom = chatroomRepository.findById(id).orElseThrow();
        return chatroom.getMessages().stream().map(MessageDTO::new).toList();
    }

    @Transactional
    public ChatroomDTO createChatroom(ChatroomRequest request) {
        List<Long> userIds = request.getMembers().stream().map(ChatUserDTO::getId).toList();
        List<ChatUser> foundUsers = userService.getAllById(userIds);

        ChatUser user = userService.getAuthenticatedUser();
        foundUsers.add(user);

        Chatroom chatroom = new Chatroom(request.getTitle(), foundUsers, null);
        Chatroom savedChatroom = chatroomRepository.save(chatroom);

        userService.addToChatroom(foundUsers, savedChatroom);

        return new ChatroomDTO(savedChatroom);
    }

    @Transactional
    public void addMessageToChatroom(Message message) {
        Chatroom chatroom = chatroomRepository.findById(message.getChatroom().getId()).orElseThrow();
        List<Message> chatroomMessages = chatroom.getMessages();
        chatroomMessages.add(message);
        chatroom.setMessages(chatroomMessages);

        chatroomRepository.save(chatroom);
    }
}