package com.progi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handle custom UserNotInvitedException
    @ExceptionHandler(UserNotInvitedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)  // You can choose the status code (e.g., 400 for bad request)
    public ResponseEntity<String> handleUserNotInvitedException(UserNotInvitedException ex, Model model) {
        model.addAttribute("errorMessage", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    // Handle other general exceptions
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleGenericException(Exception ex, Model model) {
        model.addAttribute("errorMessage", "An unexpected error occurred: " + ex.getMessage());
        return "error";  // Return the error page for generic errors
    }
}
