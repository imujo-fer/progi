package com.progi.Model;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
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
}
