package com.progi.Model;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "company")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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
