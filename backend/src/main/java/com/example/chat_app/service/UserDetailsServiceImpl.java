package com.example.chat_app.service;

import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.repo.UserRepository;
import com.example.chat_app.request.ChatUserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ChatUser user = userRepository.findByUsername(username).orElseThrow();
        return new ChatUserDetails(user);
    }
}
