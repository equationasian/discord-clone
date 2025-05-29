package com.example.chat_app.config;

import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.repo.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
    private final PasswordEncoder passwordEncoder;

    public LoadDatabase(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            ChatUser latte = new ChatUser("Latte", passwordEncoder.encode("lattepassword"), null, null);
            ChatUser mocha = new ChatUser("Mocha", passwordEncoder.encode("mochapassword"), null, null);
            ChatUser domino = new ChatUser("Domino", passwordEncoder.encode("dominopassword"), null, null);

            userRepository.save(latte);
            log.info("Preloaded user Latte");

            userRepository.save(mocha);
            log.info("Preloaded user Mocha");

            userRepository.save(domino);
            log.info("Preloaded user Domino");

            log.info(userRepository.findAll().toString());
        };
    }
}
