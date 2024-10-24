package com.progi.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "trips")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @NotNull
    private String requestNumber;//auto generated

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
    private User user;

    @Column(nullable = false)
    @NotNull
    private Timestamp createdAt;

    @OneToMany(mappedBy = "trip")
    private Set<TripStatus> tripStatuses;


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

}
