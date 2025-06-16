package com.example.chat_app.controller;

import com.example.chat_app.dto.ChatUserDTO;
import com.example.chat_app.dto.ChatroomDTO;
import com.example.chat_app.dto.MessageDTO;
import com.example.chat_app.request.ChatroomRequest;
import com.example.chat_app.service.ChatroomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/chatrooms")
@CrossOrigin("http://localhost:5173")
public class ChatroomController {
    private final ChatroomService chatroomService;

    public ChatroomController(ChatroomService chatroomService) {
        this.chatroomService = chatroomService;
    }

    @GetMapping("/group")
    public ResponseEntity<List<ChatroomDTO>> allGroupChatrooms() {
        return ResponseEntity.ok(chatroomService.getAllGroupChatrooms());
    }

    @GetMapping("/direct")
    public ResponseEntity<List<ChatroomDTO>> allDirectChatrooms() {
        return ResponseEntity.ok(chatroomService.getAllDirectChatrooms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatroomDTO> oneChatroom(@PathVariable Long id) {
        return ResponseEntity.ok(new ChatroomDTO(chatroomService.getChatroom(id)));
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<ChatUserDTO>> getMembers(@PathVariable Long id) {
        return ResponseEntity.ok(chatroomService.getMembers(id));
    }

    @GetMapping("/{id}/messages")
    public ResponseEntity<List<MessageDTO>> getMessages(@PathVariable Long id) {
        return ResponseEntity.ok(chatroomService.getMessages(id));
    }

    @PostMapping
    public ResponseEntity<ChatroomDTO> create(@RequestBody ChatroomRequest request) {
        ChatroomDTO chatroom = chatroomService.createChatroom(request);
        URI location = URI.create("/api/v1/chatrooms/" + chatroom.getId());
        return ResponseEntity.created(location).body(chatroom);
    }
}