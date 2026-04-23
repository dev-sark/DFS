package com.divinefavor.hms.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception e) {
        System.err.println("--- CRITICAL SYSTEM ERROR ---");
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of("message", "Internal Server Error: " + e.getMessage()));
    }
}
