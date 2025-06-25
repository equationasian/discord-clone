package com.example.chat_app.dto;

import com.example.chat_app.entity.Chatroom;
import com.example.chat_app.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class ChatroomDTO {
    private Long id;
    private String title;

    public ChatroomDTO(Chatroom chatroom) {
        this.id = chatroom.getId();
        this.title = chatroom.getTitle();
    }
}
