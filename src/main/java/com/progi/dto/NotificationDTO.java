package com.progi.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.progi.Model.Trip;
import com.progi.Model.TripStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NotificationDTO {
    private Trip trip;
    private TripStatus previousTripStatus;
    private TripStatus nextTripStatus;

    public NotificationDTO(Trip trip, TripStatus previousTripStatus, TripStatus nextTripStatus) {
        this.trip = trip;
        this.previousTripStatus = previousTripStatus;
        this.nextTripStatus = nextTripStatus;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public TripStatus getPreviousTripStatus() {
        return previousTripStatus;
    }

    public void setPreviousTripStatus(TripStatus previousTripStatus) {
        this.previousTripStatus = previousTripStatus;
    }

    public TripStatus getNextTripStatus() {
        return nextTripStatus;
    }

    public void setNextTripStatus(TripStatus nextTripStatus) {
        this.nextTripStatus = nextTripStatus;
    }
}
