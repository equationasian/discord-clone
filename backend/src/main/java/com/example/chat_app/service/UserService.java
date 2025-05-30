package com.example.chat_app.service;

import com.example.chat_app.dto.ChatUserDTO;
import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.repo.UserRepository;
import com.example.chat_app.request.ChatUserDetails;
import com.example.chat_app.request.LoginUser;
import com.example.chat_app.request.RegisterUser;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
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
                .map(user -> new ChatUserDTO(user.getId(), user.getUsername(), user.getAvatar(), user.getNickname()))
                .toList();
    }

    public ChatUser getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public ChatUserDTO loginUser(LoginUser user) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        ChatUserDetails authenticatedUser = (ChatUserDetails) auth.getPrincipal();
        return new ChatUserDTO(authenticatedUser.getId(), authenticatedUser.getUsername(), authenticatedUser.getAvatar(), authenticatedUser.getNickname());
    }

    public ChatUserDTO registerUser(RegisterUser user) {
        ChatUser convert = new ChatUser(user.getUsername(), passwordEncoder.encode(user.getPassword()), null, user.getNickname());
        ChatUser savedUser = userRepository.save(convert);
        return new ChatUserDTO(savedUser);
    }
}