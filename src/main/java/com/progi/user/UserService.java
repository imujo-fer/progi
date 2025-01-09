package com.progi.user;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progi.Enum.RoleType;
import com.progi.GoogleMaps.Env;
import com.progi.department.Department;
import com.progi.department.DepartmentService;
import com.progi.email.EmailService;
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

    @Autowired
    @Lazy
    private DepartmentService departmentService;
  
    @Autowired
    private EmailService emailService;

    public UserDetailsDTO inviteUser(UserInviteDTO userInviteDTO) {
        User user = userInviteDTO.toUser();

        String randomHash = UUID.randomUUID().toString();
        user.setRegistrationHash(randomHash);
        user = userRepository.save(user);

        System.out.println(Env.getBaseUrl());
        emailService.sendEmail(user.getEmail(), "Invitation to join Event spot", "You have been invited to join Event spot trip planning application. Please click the following link to register: " + Env.getBaseUrl() + "register/" + randomHash);


        return new UserDetailsDTO(user);
    }

    public User getUserById(Integer userId) {
        return userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new IllegalArgumentException("User not found" + userId));
    }

    public User getUserByRegistrationHash(String registrationHash) {
        return userRepository.findByRegistrationHash(registrationHash)
                .orElseThrow(() -> new IllegalArgumentException("User not found " + registrationHash));
    }

    public UserDetailsDTO updateUser(Integer userId, UserEditDTO userEditDTO) {
        User user = getUserById(userId);

        Department department = departmentService.getDepartmentById(userEditDTO.getDepartmentId());

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
        User user = getUserById(userId);

        return new UserInviteDetailsDTO(user);
    }

    public UserInviteDetailsDTO getUserInviteDetailsByRegistrationHash(String registrationHash) {
        User user = getUserByRegistrationHash(registrationHash);

        if (user.hasRegistered()) {
            throw new IllegalArgumentException("User has already registered");
        }

        return new UserInviteDetailsDTO(user);
    }

    public Integer countUsersByDepartment(Integer id) {
        return userRepository.countByDepartmentId(id);
    }

    public void deleteUser(Integer userId) {
        User user = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new NoSuchElementException("User not found with id " + userId));
        userRepository.delete(user);
    }
}
