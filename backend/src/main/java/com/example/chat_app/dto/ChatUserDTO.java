package com.example.chat_app.dto;

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
}