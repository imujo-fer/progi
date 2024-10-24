package com.progi.Model;


import com.progi.Enum.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "trip_statuses")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TripStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private Status status;

    @Column(nullable = false)
    @NotNull
    private Timestamp createdAt;

    @ManyToOne
    @MapsId("id")
    @JoinColumn(name = "trip_id")
    private Trip trip;

    private String message; //nullable

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

}
