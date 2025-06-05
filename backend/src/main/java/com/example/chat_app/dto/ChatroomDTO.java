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
    //private List<ChatUserDTO> members;
    //private List<Message> messages;

    public ChatroomDTO(Chatroom chatroom) {
        this.id = chatroom.getId();
        this.title = chatroom.getTitle();
        //this.members = chatroom.getMembers().stream().map(ChatUserDTO::new).toList();
        //this.messages = chatroom.getMessages() != null ? chatroom.getMessages().stream().map(MessageDTO::new).toList() : null;
    }
}
