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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "trips")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = true)
    private String requestNumber;

    @Column(nullable = false)
    @NotNull
    private double coordinatesLon;

    @Column(nullable = false)
    @NotNull
    private double coordinatesLat;

    @Column(nullable = false)
    @NotNull
    private String address;

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

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
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
}
