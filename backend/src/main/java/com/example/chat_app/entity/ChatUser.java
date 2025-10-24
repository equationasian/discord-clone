package com.example.chat_app.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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

    //@OneToMany(fetch = FetchType.EAGER)
    //@JoinColumn(name = "user_id")
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_chatrooms", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "chatroom_id"))
    private List<Chatroom> chatrooms;

    private String avatar;
    private String nickname;

    public ChatUser(String username, String password, String avatar, String nickname) {
        this.username = username;
        this.password = password;
        this.avatar = avatar;
        this.nickname = nickname;
    }
}
