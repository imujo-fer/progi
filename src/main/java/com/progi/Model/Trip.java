package com.progi.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "trips")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String requestNumber; // auto generated

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
    @JoinColumn(name = "code")
    @JsonBackReference
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
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @Column(nullable = false)
    private Timestamp createdAt; // This will be set in @PrePersist

    @OneToMany(mappedBy = "trip")
    @JsonManagedReference
    private List<TripStatus> tripStatuses;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
        generateRequestNumber();
    }

    private void generateRequestNumber() {
        if (this.id != null) {
            String formattedId = String.format("%04d", this.id);
            this.requestNumber = "#" + formattedId;
        }
    }


    //napravljeno zbog mock-a
    public Trip(int i, Object o, double v, double v1, String newYork, Country country, Timestamp timestamp, Timestamp timestamp1, String businessTrip, User user, Object o1) {
        this.id = i;
        this.coordinatesLon = v;
        this.coordinatesLat = v1;
        this.city = newYork;
        this.country = country;
        this.datetimeFrom = timestamp;
        this.datetimeTo = timestamp1;
        this.reason = businessTrip;
        this.user = user;
    }
}
