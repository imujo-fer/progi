package com.progi.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.progi.user.dto.UserDetailsDTO;
import com.progi.user.dto.UserEditDTO;
import com.progi.user.dto.UserInviteDTO;
import com.progi.user.dto.UserInviteDetailsDTO;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/invite")
    public ResponseEntity<UserDetailsDTO> inviteUser(@RequestBody UserInviteDTO userInviteDTO) {
        UserDetailsDTO newUser = userService.inviteUser(userInviteDTO);

        return ResponseEntity.ok(newUser);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDetailsDTO> updateUser(Integer userId, @RequestBody UserEditDTO userInviteDTO) {
        UserDetailsDTO updatedUser = userService.updateUser(userId, userInviteDTO);

        return ResponseEntity.ok(updatedUser);
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<UserInviteDetailsDTO> getUserDetails(Integer userId) {
        UserInviteDetailsDTO userDetails = userService.getUserInviteDetails(userId);
        
        return ResponseEntity.ok(userDetails);
    }

    @GetMapping("register-info/{registrationHash}")
    public ResponseEntity<UserInviteDetailsDTO> getUserDetailsByRegistrationHash(String registrationHash) {
        UserInviteDetailsDTO userDetails = userService.getUserInviteDetailsByRegistrationHash(registrationHash);
        
        return ResponseEntity.ok(userDetails);
    }
}
