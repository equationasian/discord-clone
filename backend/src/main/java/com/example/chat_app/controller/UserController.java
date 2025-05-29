package com.example.chat_app.controller;

import com.example.chat_app.dto.ChatUserDTO;
import com.example.chat_app.entity.ChatUser;
import com.example.chat_app.request.ChatUserDetails;
import com.example.chat_app.request.LoginUser;
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

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin("http://localhost:5173")
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    public UserController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping
    public ResponseEntity<List<ChatUser>> allUsers() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<ChatUserDTO> login(@RequestBody LoginUser user) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        ChatUserDetails authenticatedUser = (ChatUserDetails) auth.getPrincipal();
        ChatUserDTO userDTO = new ChatUserDTO(authenticatedUser.getId(), authenticatedUser.getUsername(), authenticatedUser.getAvatar(), authenticatedUser.getNickname());
        return ResponseEntity.ok(userDTO);
    }
}