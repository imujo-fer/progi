package com.progi.tripstatus;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.progi.Enum.Status;
import com.progi.trip.Trip;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "trip_statuses")
@NoArgsConstructor
@Getter
@Setter
public class TripStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private Status status;


    @ManyToOne
    @JoinColumn(name = "trip_id")
    @JsonBackReference
    private Trip trip;

    private String message; //nullable

    @Column(nullable = false)
    @NotNull
    private Timestamp createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public TripStatus(Integer id, Status status, Timestamp createdAt, Trip trip, String message) {
        this.id = id;
        this.status = status;
        this.createdAt = createdAt;
        this.trip = trip;
        this.message = message;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public @NotNull Status getStatus() {
        return status;
    }

    public void setStatus(@NotNull Status status) {
        this.status = status;
    }

    public @NotNull Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(@NotNull Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
