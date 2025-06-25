package com.example.chat_app.config;

import com.example.chat_app.dto.ChatUserDTO;
import com.example.chat_app.dto.MessageDTO;
import com.example.chat_app.request.ChatroomRequest;
import com.example.chat_app.request.LoginUser;
import com.example.chat_app.request.RegisterUser;
import com.example.chat_app.service.ChatService;
import com.example.chat_app.service.ChatroomService;
import com.example.chat_app.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    public CommandLineRunner initDatabase(UserService userService, ChatService chatService, ChatroomService chatroomService) {
        return args -> {
            ChatUserDTO latte = userService.registerUser(new RegisterUser("Latte", null, "lattepassword"));
            log.info("Preloaded user Latte");

            ChatUserDTO mocha = userService.registerUser(new RegisterUser("Mocha", null, "mochapassword"));
            log.info("Preloaded user Mocha");

            ChatUserDTO domino = userService.registerUser(new RegisterUser("Domino", null, "dominopassword"));
            log.info("Preloaded user Domino");
        };
    }
}
