package com.progi.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.progi.user.dto.UserDetailsDTO;
import com.progi.user.dto.UserInviteDTO;

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
    
}
