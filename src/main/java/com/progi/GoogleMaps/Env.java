package com.progi.GoogleMaps;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class Env {

    @Value("${google.api_key}")
    private String googleApiKeyEnv;

    @Value("${env}")
    private String envEnv;

    private static String GOOGLE_API_KEY; 
    private static String ENV; 

    @PostConstruct
    public void init() {
        GOOGLE_API_KEY = googleApiKeyEnv;
        ENV = envEnv;
    }

    public static String getGoogleApiKey() {
        return GOOGLE_API_KEY;
    }

    public static String getEnv() {
        return ENV;
    }


    
}
