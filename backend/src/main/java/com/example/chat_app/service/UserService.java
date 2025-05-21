package com.example.chat_app.service;

import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<ChatUser> getAllUsers() {
        return userRepository.findAll();
    }
}
