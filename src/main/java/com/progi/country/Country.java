package com.progi.country;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.progi.Enum.Continent;
import com.progi.trip.Trip;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "countries")
@Getter
@Setter
public class Country {

    @Id
    @Column(name = "code")
    @NotNull
    private String code;

    @Column(unique = true, nullable = false)
    @NotNull
    private String name;

    @Column(nullable = false)
    @NotNull
    private double eurDailyWage;

    @OneToMany(mappedBy = "country")
    @JsonManagedReference
    @NotNull
    private List<Trip> trips;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private Continent continent;

    public Country(String code, String name, double eurDailyWage, List<Trip> trips, Continent continent) {
        this.code = code;
        this.name = name;
        this.eurDailyWage = eurDailyWage;
        this.trips = trips;
        this.continent = continent;
    }

    public Country() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public @NotNull String getName() {
        return name;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }

    @NotNull
    public double getEurDailyWage() {
        return eurDailyWage;
    }

    public void setEurDailyWage(@NotNull double eurDailyWage) {
        this.eurDailyWage = eurDailyWage;
    }

    public List<Trip> getTrips() {
        return trips;
    }

    public void setTrips(List<Trip> trips) {
        this.trips = trips;
    }

    public Continent getContinent() {
        return continent;
    }

    public void setContinent(Continent continent) {
        this.continent = continent;
    }
}
