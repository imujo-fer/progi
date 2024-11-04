package com.progi.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.progi.Model.Trip;
import com.progi.Model.TripStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDTO {
    private Trip trip;
    private TripStatus previousTripStatus;
    private TripStatus nextTripStatus;

}
