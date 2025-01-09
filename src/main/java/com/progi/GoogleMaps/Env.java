package com.progi.GoogleMaps;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class Env {

    @Value("${env.google_api_key}")
    private String googleApiKeyEnv;
    private static String GOOGLE_API_KEY; 

    @Value("${env.env}")
    private String envEnv;
    private static String ENV; 

    @Value("${env.base_url}")
    private String baseUrlEnv;
    private static String BASE_URL; 


    @PostConstruct
    public void init() {
        GOOGLE_API_KEY = googleApiKeyEnv;
        ENV = envEnv;
        BASE_URL = baseUrlEnv;
    }

    public static String getGoogleApiKey() {
        return GOOGLE_API_KEY;
    }

    public static String getEnv() {
        return ENV;
    }

    public static String getBaseUrl() {
        return BASE_URL;
    }


    
}
