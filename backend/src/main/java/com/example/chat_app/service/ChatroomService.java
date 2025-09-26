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

import java.util.ArrayList;
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

    public List<ChatroomDTO> filterChatrooms(String filter) {
        Long userId = userService.getAuthenticatedUser().getId();
        List<Chatroom> chatrooms = userService.getAllChatrooms(userId);

        if (filter.equals("direct")) {
            return chatrooms.stream()
                    .filter(chatroom -> chatroom.getMemberIds().size() == 2)
                    .map(ChatroomDTO::new)
                    .toList();
        }

        return chatrooms.stream()
                .filter(chatroom -> chatroom.getMemberIds().size() > 2)
                .map(ChatroomDTO::new)
                .toList();
    }

    @Transactional
    public List<ChatUserDTO> getMembers(Long id) {
        Chatroom chatroom = chatroomRepository.findById(id).orElseThrow();
        List<ChatUser> users = userService.getAllById(chatroom.getMemberIds());
        return users.stream().map(ChatUserDTO::new).toList();
    }

    @Transactional
    public List<MessageDTO> getMessages(Long id) {
        Chatroom chatroom = chatroomRepository.findById(id).orElseThrow();
        return chatroom.getMessages().stream().map(MessageDTO::new).toList();
    }

    @Transactional
    public ChatroomDTO createChatroom(ChatroomRequest request) {
        List<Long> userIds = new ArrayList<>(request.getMembers().stream().map(ChatUserDTO::getId).toList());
        List<ChatUser> foundUsers = userService.getAllById(userIds);

        Long currentUserId = userService.getAuthenticatedUser().getId();
        ChatUser user = userService.getUserById(currentUserId);
        foundUsers.add(user);
        userIds.add(currentUserId);

        Chatroom chatroom = new Chatroom(request.getTitle(), userIds, null);
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