package com.example.chat_app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private ChatUser user;

    @ManyToOne
    @JoinColumn(name = "chatroom_id", nullable = false)
    private Chatroom chatroom;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    @Column(nullable = false)
    private LocalDateTime time;

    public Message(ChatUser user, Chatroom chatroom, String body, LocalDateTime time) {
        this.user = user;
        this.chatroom = chatroom;
        this.body = body;
        this.time = time;
    }
}