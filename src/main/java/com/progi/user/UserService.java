package com.progi.user;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progi.user.dto.UserDetailsDTO;
import com.progi.user.dto.UserInviteDTO;
import com.progi.user.dto.UserInviteDetailsDTO;

import java.util.UUID;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDetailsDTO inviteUser(UserInviteDTO userInviteDTO) {
        User user = userInviteDTO.toUser();

        String randomHash = UUID.randomUUID().toString();
        user.setRegistrationHash(randomHash);
        user = userRepository.save(user);

        return new UserDetailsDTO(user);
    }

    public UserInviteDetailsDTO getUserInviteDetails(Integer userId) {
        User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new UserInviteDetailsDTO(user);
    }

    public UserInviteDetailsDTO getUserInviteDetailsByRegistrationHash(String registrationHash) {
        User user = userRepository.findByRegistrationHash(registrationHash).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (user.hasRegistered()) {
            throw new IllegalArgumentException("User has already registered");
        }

        return new UserInviteDetailsDTO(user);
    }



}
