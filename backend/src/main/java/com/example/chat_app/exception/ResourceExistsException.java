package com.example.chat_app.exception;

public class ResourceExistsException extends Exception {
    public ResourceExistsException(String message) {
        super(message);
    }
}