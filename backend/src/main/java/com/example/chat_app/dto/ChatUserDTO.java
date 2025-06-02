package com.example.chat_app.dto;

import com.example.chat_app.entity.ChatUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ChatUserDTO {
    private Long id;
    private String username;
    private String avatar;
    private String nickname;

    public ChatUserDTO(ChatUser user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.avatar = user.getAvatar();
        this.nickname = user.getNickname();
    }
}