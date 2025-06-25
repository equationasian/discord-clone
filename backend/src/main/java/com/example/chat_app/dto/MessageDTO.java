package com.example.chat_app.dto;

import com.example.chat_app.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class MessageDTO {
    private Long id;
    private ChatUserDTO user;
    private Long chatroomId;
    private String body;
    private Instant time;

    public MessageDTO(ChatUserDTO user, Long chatroomId, String body, Instant time) {
        this.user = user;
        this.chatroomId = chatroomId;
        this.body = body;
        this.time = time;
    }

    public MessageDTO(Message message) {
        this.id = message.getId();
        this.user = new ChatUserDTO(message.getUser());
        this.chatroomId = message.getChatroom().getId();
        this.body = message.getBody();
        this.time = message.getTime();
    }
}