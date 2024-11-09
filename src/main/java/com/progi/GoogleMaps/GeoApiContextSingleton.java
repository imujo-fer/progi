package com.progi.GoogleMaps;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.GeocodingResult;
import io.github.cdimascio.dotenv.Dotenv;

public class GeoApiContextSingleton {
    private static final String API_KEY;

    static {
        Dotenv dotenv = Dotenv.load();
        API_KEY = dotenv.get("GOOGLE_API_KEY"); 

        if (API_KEY == null || API_KEY.isEmpty()) {
            throw new IllegalStateException("Google API key is not set in the .env file");
        }
    }

    private GeoApiContextSingleton() {}

    private static class GeoApiContextHolder {
        private static final GeoApiContext INSTANCE = new GeoApiContext.Builder()
            .apiKey(API_KEY)
            .build();
    }

    public static GeoApiContext getInstance() {
        return GeoApiContextHolder.INSTANCE;
    }

    public static void shutdown() {
        getInstance().shutdown();
    }

    public static GeocodingResult[] getGeocodingResponse(String location) throws Exception {
        GeoApiContext context = getInstance();
        return GeocodingApi.geocode(context, location).await();
    }
}
