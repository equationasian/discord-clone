package com.example.chat_app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatUser {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String avatar;
    private String nickname;

    public ChatUser(String username, String password, String avatar, String nickname) {
        this.username = username;
        this.password = password;
        this.avatar = avatar;
        this.nickname = nickname;
    }
}
