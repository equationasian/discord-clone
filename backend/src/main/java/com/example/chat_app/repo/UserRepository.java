package com.example.chat_app.repo;

import com.example.chat_app.entity.ChatUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<ChatUser, Long> {
}