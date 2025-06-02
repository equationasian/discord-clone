package com.example.chat_app.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class RegisterUser {
    private String username;
    private String nickname;
    private String password;
}