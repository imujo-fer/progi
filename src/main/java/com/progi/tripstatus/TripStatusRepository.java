package com.progi.tripstatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TripStatusRepository extends JpaRepository<TripStatus, Integer> {
    @Query("SELECT ts FROM TripStatus ts WHERE ts.trip.id = :tripId ORDER BY ts.createdAt DESC LIMIT 1")
    Optional<TripStatus> findTopByTripIdOrderByCreatedAtDesc(@Param("tripId") Integer tripId);

    @Query("SELECT ts FROM TripStatus ts WHERE ts.trip.id = :tripId ORDER BY ts.createdAt DESC")
    List<TripStatus> findStatusesByTripIdOrdered(@Param("tripId") Integer tripId);
}
