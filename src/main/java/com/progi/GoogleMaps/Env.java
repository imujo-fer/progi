package com.progi.GoogleMaps;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class Env {

    @Value("${google.api_key}")
    private String googleApiKeyEnv;

    private static String GOOGLE_API_KEY; 

    @PostConstruct
    public void init() {
        GOOGLE_API_KEY = googleApiKeyEnv;
    }

    public static String getGoogleApiKey() {
        return GOOGLE_API_KEY;
    }


    
}
