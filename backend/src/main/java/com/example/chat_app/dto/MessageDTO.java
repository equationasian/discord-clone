package com.example.chat_app.dto;

import com.example.chat_app.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MessageDTO {
    private Long id;
    private ChatUserDTO user;
    private String body;
    private LocalDateTime time;

    public MessageDTO(ChatUserDTO user, String body, LocalDateTime time) {
        this.user = user;
        this.body = body;
        this.time = time;
    }

    public MessageDTO(Message message) {
        this.id = message.getId();
        this.user = new ChatUserDTO(message.getUser());
        this.body = message.getBody();
        this.time = message.getTime();
    }
}