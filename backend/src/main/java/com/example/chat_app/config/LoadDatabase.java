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

            /*chatroomService.createChatroom(new ChatroomRequest("General", List.of(latte, mocha, domino)));
            log.info("Preloaded chatroom General with members Latte, Mocha, Domino");

            MessageDTO latteMsg = new MessageDTO(latte, 1L, "If a dog chews shoes, whose shoes does he choose?", LocalDateTime.now());
            chatService.saveMessage(latteMsg);
            MessageDTO mochaMsg = new MessageDTO(mocha, 1L, "Top chopstick shops stock top chopsticks.", LocalDateTime.now());
            chatService.saveMessage(mochaMsg);
            MessageDTO dominoMsg = new MessageDTO(domino, 1L, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac finibus libero. Sed id mauris feugiat turpis ultricies auctor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur accumsan, turpis id fringilla varius, massa orci vehicula mauris, quis posuere mi nisl et orci. Donec sed dictum quam. Etiam nisl metus, rutrum a tristique porta, ultricies non nibh. Maecenas convallis porta sem eu pretium. Suspendisse sodales, nibh nec tincidunt porttitor, dolor quam scelerisque mi, vel consectetur urna tortor at lorem. Donec sed aliquam felis. Donec accumsan blandit turpis quis auctor. Vivamus nulla magna, dictum eu diam iaculis, facilisis vehicula tortor. Nulla luctus eros sit amet vulputate elementum. ", LocalDateTime.now());
            chatService.saveMessage(dominoMsg);
            log.info("Preloaded three messages to General");

            chatroomService.createChatroom(new ChatroomRequest("Test", List.of(latte, mocha)));
            log.info("Preloaded direct chatroom with members Latte and Mocha");*/
        };
    }
}
