package com.progi.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.progi.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByProviderAndProviderId(String provider, String providerId);
}
