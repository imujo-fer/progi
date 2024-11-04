package com.progi.mockcontroller;

import com.progi.Model.Trip;
import com.progi.dto.NotificationDTO;
import com.progi.mockdata.MockTrip;
import com.progi.mockdata.MockTripStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/trip-statuses")
public class TripStatusMockController {

    @GetMapping("/notifications")
    public ResponseEntity<List<NotificationDTO>> getNotifications() {
        List<NotificationDTO> notifications = new ArrayList<>();

        notifications.add(
            new NotificationDTO(
                    MockTrip.generateMockTrips().get(0),
                    MockTripStatus.generateMockTripStatuses().get(0),
                    MockTripStatus.generateMockTripStatuses().get(1)
            )
        );
        notifications.add(
                new NotificationDTO(
                        MockTrip.generateMockTrips().get(1),
                        MockTripStatus.generateMockTripStatuses().get(1),
                        MockTripStatus.generateMockTripStatuses().get(0)
                )
        );
        notifications.add(
                new NotificationDTO(
                        MockTrip.generateMockTrips().get(2),
                        MockTripStatus.generateMockTripStatuses().get(2),
                        MockTripStatus.generateMockTripStatuses().get(0)
                )
        );

        System.out.println(notifications);

        return ResponseEntity.ok(notifications);
    }
}
