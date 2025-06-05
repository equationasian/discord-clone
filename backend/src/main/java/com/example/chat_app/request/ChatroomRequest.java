package com.example.chat_app.request;

import com.example.chat_app.dto.ChatUserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ChatroomRequest {
    private String title;
    private List<ChatUserDTO> members;
}