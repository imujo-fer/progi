package com.progi.tripstatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TripStatusRepository extends JpaRepository<TripStatus, Integer> {

    @Query("SELECT ts FROM TripStatus ts WHERE ts.trip.id = :tripId ORDER BY ts.createdAt DESC")
    List<TripStatus> findStatusesByTripIdOrdered(@Param("tripId") Integer tripId);


    @Query("SELECT ts FROM TripStatus ts JOIN ts.trip t WHERE t.user.id = :userId ORDER BY ts.createdAt DESC")
    List<TripStatus> findStatusesByUserIdOrdered(@Param("userId") Integer userId);
}
