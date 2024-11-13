package com.progi.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.progi.user.User;
import com.progi.user.UserRepository;

@Service
public class UserSessionService {

    private final UserRepository userRepository;

    @Autowired
    public UserSessionService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();  
            String email = oauth2User.getAttribute("email");  
            
            return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found in database"));
        }
        System.out.println("not authorize");
        throw new RuntimeException("User is not authenticated.");
    }
}
