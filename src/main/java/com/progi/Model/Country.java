package com.progi.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.progi.Enum.Continent;
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
@NoArgsConstructor
@AllArgsConstructor
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Continent continent;
}
