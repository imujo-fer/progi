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

    public Company(Integer id, double eurCostPerKm, double locationCoordLat, double locationCoordLon, String address, String city, Country country, String iban) {
        this.id = id;
        this.eurCostPerKm = eurCostPerKm;
        this.locationCoordLat = locationCoordLat;
        this.locationCoordLon = locationCoordLon;
        this.address = address;
        this.city = city;
        this.country = country;
        this.iban = iban;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @NotNull
    public double getEurCostPerKm() {
        return eurCostPerKm;
    }

    public void setEurCostPerKm(@NotNull double eurCostPerKm) {
        this.eurCostPerKm = eurCostPerKm;
    }

    @NotNull
    public double getLocationCoordLat() {
        return locationCoordLat;
    }

    public void setLocationCoordLat(@NotNull double locationCoordLat) {
        this.locationCoordLat = locationCoordLat;
    }

    @NotNull
    public double getLocationCoordLon() {
        return locationCoordLon;
    }

    public void setLocationCoordLon(@NotNull double locationCoordLon) {
        this.locationCoordLon = locationCoordLon;
    }

    public @NotNull String getAddress() {
        return address;
    }

    public void setAddress(@NotNull String address) {
        this.address = address;
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

    public @NotNull String getIban() {
        return iban;
    }

    public void setIban(@NotNull String iban) {
        this.iban = iban;
    }
}
