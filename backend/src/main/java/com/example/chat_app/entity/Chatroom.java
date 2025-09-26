package com.example.chat_app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Chatroom {
    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private List<Long> memberIds;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Message> messages;

    public Chatroom(String title, List<Long> memberIds, List<Message> messages) {
        this.title = title;
        this.memberIds = memberIds;
        this.messages = messages;
    }
}