package com.progi.GoogleMaps;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.maps.model.GeocodingResult;

@RestController
@RequestMapping("/api/google-maps")
public class GoogleMapsController {

    @GetMapping("/location/{location}")
    public ResponseEntity<GeocodingResult[]> getLocationInfo(@PathVariable String location) throws Exception {
        GeocodingResult[] results = GeoApiContextSingleton.getGeocodingResponse(location);
        return ResponseEntity.ok(results);
    }
    
}
