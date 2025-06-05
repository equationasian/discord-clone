package com.example.chat_app.dto;

import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.entity.Chatroom;
import com.example.chat_app.request.ChatUserDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class ChatUserDTO {
    private Long id;
    private String username;
    private List<Long> chatroomIds;
    private String avatar;
    private String nickname;

    public ChatUserDTO(ChatUser user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.chatroomIds = user.getChatrooms() != null ? user.getChatrooms().stream().map(Chatroom::getId).toList() : null;
        this.avatar = user.getAvatar();
        this.nickname = user.getNickname();
    }

    public ChatUserDTO(ChatUserDetails user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.chatroomIds = user.getChatrooms() != null ? user.getChatrooms().stream().map(Chatroom::getId).toList() : null;
        this.avatar = user.getAvatar();
        this.nickname = user.getNickname();
    }
}