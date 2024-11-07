package com.progi.tripstatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip-statuses")
public class TripStatusController {

    @Autowired
    private TripStatusService tripStatusService;

    @PostMapping
    public ResponseEntity<TripStatus> createTripStatus(@RequestBody TripStatusDTO tripStatusDTO) {
        return ResponseEntity.ok(tripStatusService.createTripStatus(tripStatusDTO));
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<NotificationDTO>> getNotifications(){
        return ResponseEntity.ok(tripStatusService.getNotifications());
    }

}
