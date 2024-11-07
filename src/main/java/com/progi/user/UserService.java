package com.progi.user;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progi.Enum.RoleType;
import com.progi.department.Department;
import com.progi.role.Role;
import com.progi.user.dto.UserDetailsDTO;
import com.progi.user.dto.UserEditDTO;
import com.progi.user.dto.UserInviteDTO;
import com.progi.user.dto.UserInviteDetailsDTO;

import jakarta.transaction.Transactional;

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

    public UserDetailsDTO updateUser(Integer userId, UserEditDTO userEditDTO) {
        User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Department department = new Department();
        department.setId(userEditDTO.getDepartmentId());

        List<Role> roles = new ArrayList<>();
        for (RoleType roleType : userEditDTO.getRoles()) {
            Role role = new Role();
            role.setRoleType(roleType);
            roles.add(role); 
        }

        user.setFirstName(userEditDTO.getFirstName());
        user.setLastName(userEditDTO.getLastName());
        user.setIban(userEditDTO.getIban());
        user.setRoles(roles);
        user.setDepartment(department);

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
