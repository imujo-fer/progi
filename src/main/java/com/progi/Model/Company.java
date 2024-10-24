package com.progi.Model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
    private Country country;

    @Column(nullable = false)
    @NotNull
    private String iban;
}
