package com.progi.tripstatus;


import com.progi.Enum.Status;
import com.progi.trip.TripNotificationDTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data

public class NotificationDTO {
    @NotNull
    private TripNotificationDTO trip;
    @NotNull
    private Status previousTripStatusStatus;
    @NotNull
    private TripStatus nextTripStatus;
}
