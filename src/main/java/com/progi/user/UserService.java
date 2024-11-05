package com.progi.user;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserbyId(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not found with id " + id));
    }
}
