package com.progi.tripstatus;


import com.progi.Enum.Status;
import com.progi.trip.Trip;
import com.progi.trip.TripNotificationDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NotificationDTO {
    @NotNull
    private TripNotificationDTO trip;
    @NotNull
    private Status previousTripStatus;
    @NotNull
    private TripStatus nextTripStatus;
}
