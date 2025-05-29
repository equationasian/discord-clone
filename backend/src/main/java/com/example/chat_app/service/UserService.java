package com.example.chat_app.service;

import com.example.chat_app.dto.ChatUserDTO;
import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.repo.UserRepository;
import com.example.chat_app.request.ChatUserDetails;
import com.example.chat_app.request.LoginUser;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ChatUser user = userRepository.findByUsername(username).orElseThrow();
        return new ChatUserDetails(user);
    }

    public List<ChatUser> getAllUsers() {
        return userRepository.findAll();
    }

    /*public ChatUserDTO authenticate() {
        ChatUser authenticatedUser = userRepository.findByUsername(user.getUsername()).orElseThrow();
        return new ChatUserDTO(authenticatedUser.getId(), authenticatedUser.getUsername(), authenticatedUser.getAvatar(), authenticatedUser.getNickname());
    }*/
}
