package com.example.chat_app.service;

import com.example.chat_app.dto.ChatUserDTO;
import com.example.chat_app.dto.ChatroomDTO;
import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.entity.Chatroom;
import com.example.chat_app.repo.UserRepository;
import com.example.chat_app.request.ChatUserDetails;
import com.example.chat_app.request.LoginUser;
import com.example.chat_app.request.RegisterUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    private final static Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public List<ChatUserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(ChatUserDTO::new)
                .toList();
    }

    public List<ChatUser> getAllById(List<Long> userIds) {
        return userRepository.findAllById(userIds);
    }

    public ChatUser getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public ChatUserDTO loginUser(LoginUser user) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        ChatUserDetails authenticatedUser = (ChatUserDetails) auth.getPrincipal();
        return new ChatUserDTO(authenticatedUser);
    }

    public ChatUserDTO registerUser(RegisterUser user) {
        ChatUser convert = new ChatUser(user.getUsername(), passwordEncoder.encode(user.getPassword()), null, user.getNickname());
        ChatUser savedUser = userRepository.save(convert);
        return new ChatUserDTO(savedUser);
    }

    public List<ChatUserDTO> addToChatroom(List<ChatUser> users, Chatroom chatroom) {
        List<ChatUser> updatedUsers = users.stream().map(user -> {
           List<Chatroom> updatedChatrooms = user.getChatrooms();
           updatedChatrooms.add(chatroom);
           user.setChatrooms(updatedChatrooms);
           return user;
        }).toList();

        return updatedUsers.stream().map(ChatUserDTO::new).toList();

        /*List<Chatroom> updatedChatrooms = user.getChatrooms();
        updatedChatrooms.add(chatroom);
        user.setChatrooms(updatedChatrooms);
        ChatUser updatedUser = userRepository.save(user);
        return new ChatUserDTO(updatedUser);*/
    }
}