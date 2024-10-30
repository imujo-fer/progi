package com.progi.Model;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


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
    private List<Trip> trips;

    // @Enumerated(EnumType.STRING)
    // @Column(nullable = false)
    // private Continent continent;
}
