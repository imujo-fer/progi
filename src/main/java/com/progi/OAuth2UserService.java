package com.progi;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.progi.Model.User;
import com.progi.exceptions.UserNotInvitedException;
import com.progi.user.UserRepository;

@Service
public class OAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String providerId = oAuth2User.getAttribute("sub"); 

        Optional<User> registeredUser = userRepository.findByProviderAndProviderId("google", providerId);

        Optional<User> optionalUnregisteredUser = userRepository.findByEmail(email);

        if (registeredUser.isEmpty()) {

            if (optionalUnregisteredUser.isEmpty()) {
                throw new UserNotInvitedException("User with email " + email + " wasnt invited");
            }

            User unregisteredUser = optionalUnregisteredUser.get();

            unregisteredUser.setProvider("google");
            unregisteredUser.setProviderId(providerId);

            userRepository.save(unregisteredUser);
        }

        return oAuth2User;
    }
    
}
