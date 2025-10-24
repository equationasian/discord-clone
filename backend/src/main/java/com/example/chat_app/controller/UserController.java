package com.example.chat_app.controller;

import com.example.chat_app.dto.ChatUserDTO;
import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.exception.ResourceExistsException;
import com.example.chat_app.request.ChatUserDetails;
import com.example.chat_app.request.LoginUser;
import com.example.chat_app.request.NicknameRequest;
import com.example.chat_app.request.RegisterUser;
import com.example.chat_app.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin("http://localhost:5173")
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<ChatUserDTO>> allUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<ChatUserDTO>> searchUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.getAllUsersLikeUsername(username));
    }

    @PutMapping("/{username}")
    public ResponseEntity<ChatUserDTO> updateNickname(@PathVariable String username, @RequestBody NicknameRequest nickname) {
        return ResponseEntity.ok(userService.updateNickname(username, nickname.getNickname()));
    }

    @PostMapping("/login")
    public ResponseEntity<ChatUserDTO> login(@RequestBody LoginUser user) {
        return ResponseEntity.ok(userService.loginUser(user));
    }

    @PostMapping("/register")
    public ResponseEntity<ChatUserDTO> register(@RequestBody RegisterUser user) throws ResourceExistsException {
        return new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/upload")
    public ResponseEntity<ChatUserDTO> uploadProfilePic(@RequestParam("profile") MultipartFile profilePic) {
        return ResponseEntity.ok(userService.updateAvatar(profilePic));
    }
}