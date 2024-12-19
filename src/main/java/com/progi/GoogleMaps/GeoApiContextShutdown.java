package com.progi.GoogleMaps;

import org.springframework.stereotype.Component;

import jakarta.annotation.PreDestroy;

@Component
public class GeoApiContextShutdown {

    @PreDestroy
    public void onShutdown() {
        GeoApiContextSingleton.shutdown();
        System.out.println("GeoApiContext has been shut down.");
    }
}
    
