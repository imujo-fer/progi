package com.progi.trip;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import com.progi.expensereport.ExpenseReport;
import com.progi.country.Country;
import com.progi.tripstatus.TripStatus;
import com.progi.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "trips")
@Getter
@Setter

public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Integer id;

    @Column(unique = true, nullable = true)
    @NotNull
    private String requestNumber;

    @Column(nullable = false)
    @NotNull
    private double coordinatesLon;

    @Column(nullable = false)
    @NotNull
    private double coordinatesLat;

    @Column(nullable = false)
    @NotNull
    private String city;

    @ManyToOne
    @JoinColumn(name = "country_code", referencedColumnName = "code", nullable = false)
    @JsonBackReference
    @NotNull
    private Country country;

    @Column(nullable = false)
    @NotNull
    private Timestamp datetimeFrom;

    @Column(nullable = false)
    @NotNull
    private Timestamp datetimeTo;

    @Column(nullable = false)
    @NotNull
    private String reason;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    @NotNull
    private User user;

    @OneToOne(mappedBy = "trip")
    @JsonManagedReference
    private ExpenseReport expenseReport;

    @OneToMany(mappedBy = "trip")
    @JsonManagedReference
    @NotNull
    private List<TripStatus> tripStatuses;

    @Column(nullable = false)
    @NotNull
    private Timestamp createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    @PostPersist
    private void generateRequestNumber() {
        String formattedId = String.format("%04d", this.id);
        this.requestNumber = "#" + formattedId;
    }

    public Trip(Integer id, String requestNumber, double coordinatesLon, double coordinatesLat, String city, Country country, Timestamp datetimeFrom, Timestamp datetimeTo, String reason, User user, Timestamp createdAt, List<TripStatus> tripStatuses) {
        this.id = id;
        this.requestNumber = requestNumber;
        this.coordinatesLon = coordinatesLon;
        this.coordinatesLat = coordinatesLat;
        this.city = city;
        this.country = country;
        this.datetimeFrom = datetimeFrom;
        this.datetimeTo = datetimeTo;
        this.reason = reason;
        this.user = user;
        this.createdAt = createdAt;
        this.tripStatuses = tripStatuses;
    }

    public Trip() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRequestNumber() {
        return requestNumber;
    }

    public void setRequestNumber(String requestNumber) {
        this.requestNumber = requestNumber;
    }

    @NotNull
    public double getCoordinatesLon() {
        return coordinatesLon;
    }

    public void setCoordinatesLon(@NotNull double coordinatesLon) {
        this.coordinatesLon = coordinatesLon;
    }

    @NotNull
    public double getCoordinatesLat() {
        return coordinatesLat;
    }

    public void setCoordinatesLat(@NotNull double coordinatesLat) {
        this.coordinatesLat = coordinatesLat;
    }

    public @NotNull String getCity() {
        return city;
    }

    public void setCity(@NotNull String city) {
        this.city = city;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public @NotNull Timestamp getDatetimeFrom() {
        return datetimeFrom;
    }

    public void setDatetimeFrom(@NotNull Timestamp datetimeFrom) {
        this.datetimeFrom = datetimeFrom;
    }

    public @NotNull Timestamp getDatetimeTo() {
        return datetimeTo;
    }

    public void setDatetimeTo(@NotNull Timestamp datetimeTo) {
        this.datetimeTo = datetimeTo;
    }

    public @NotNull String getReason() {
        return reason;
    }

    public void setReason(@NotNull String reason) {
        this.reason = reason;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public List<TripStatus> getTripStatuses() {
        return tripStatuses;
    }

    public void setTripStatuses(List<TripStatus> tripStatuses) {
        this.tripStatuses = tripStatuses;
    }
}
