package com.progi.exceptions;

public class UserNotInvitedException extends RuntimeException {
    public UserNotInvitedException(String message) {
        super(message);
    }
}

