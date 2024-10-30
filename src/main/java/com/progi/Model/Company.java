package com.progi.Model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "company")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotNull
    private double eurCostPerKm;

    @Column(nullable = false)
    @NotNull
    private double locationCoordLat;

    @Column(nullable = false)
    @NotNull
    private double locationCoordLon;

    @Column(nullable = false)
    @NotNull
    private String address;

    @Column(nullable = false)
    @NotNull
    private String city;

    @ManyToOne
    @JsonBackReference
    private Country country;

    @Column(nullable = false)
    @NotNull
    private String iban;
}
