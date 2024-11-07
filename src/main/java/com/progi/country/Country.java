package com.progi.country;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.progi.Enum.Continent;
import com.progi.trip.Trip;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "countries")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Country {

    @Id
    @Column(name = "code")
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

}
