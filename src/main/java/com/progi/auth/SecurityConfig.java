package com.progi.auth;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

        private final OAuth2UserService customOAuth2UserService;

        // Constructor injection to ensure that Spring provides the service
        public SecurityConfig(OAuth2UserService customOAuth2UserService) {
                this.customOAuth2UserService = customOAuth2UserService;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                        .authorizeHttpRequests(auth -> auth
                                // .requestMatchers("/", "/oauth2/**", "/register", "/register/addUser", "/login/**").permitAll()
                                // .anyRequest().authenticated()
                                .anyRequest().permitAll()

                        )
                        .oauth2Login(oauth2 -> oauth2  
                                .loginPage("/login")
                                .defaultSuccessUrl("/", true) 
                                .failureUrl("/login?error=true")
                                .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint.userService(customOAuth2UserService))
                        ).csrf().disable();
                return http.build();
        }

   
   }
