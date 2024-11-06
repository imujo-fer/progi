package com.progi.trip;

import com.progi.Enum.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Integer> {
    @Query("SELECT t FROM Trip t JOIN t.tripStatuses ts WHERE t.user.id = :userId AND ts.status = :status AND ts.createdAt = (SELECT MAX(ts2.createdAt) FROM TripStatus ts2 WHERE ts2.trip.id = t.id)")
    Page<Trip> findByUserIdAndStatus(@Param("userId") Integer userId, @Param("status") Status status, Pageable pageable);

    @Query("SELECT t FROM Trip t WHERE t.user.id = :userId")
    List<Trip> findByUserId(@Param("userId") Integer userId);
}

