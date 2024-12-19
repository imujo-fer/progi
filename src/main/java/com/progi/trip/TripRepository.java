package com.progi.trip;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.progi.Enum.Status;

public interface TripRepository extends JpaRepository<Trip, Integer> {
    @Query("""
                SELECT t
                FROM Trip t
                JOIN t.tripStatuses ts
                WHERE t.user.id = :userId
                  AND ts.createdAt = (
                      SELECT MAX(ts2.createdAt)
                      FROM TripStatus ts2
                      WHERE ts2.trip.id = t.id
                  )
                  AND ts.status = :status
            """)
    Page<Trip> findByUserIdAndStatus(@Param("userId") Integer userId, @Param("status") Status status,
            Pageable pageable);

    @Query("SELECT t FROM Trip t JOIN t.tripStatuses ts JOIN t.user u WHERE u.department.id = :departmentId AND ts.status = 'PENDING_DEPARTMENT_APPROVAL' AND ts.createdAt = (SELECT MAX(ts2.createdAt) FROM TripStatus ts2 WHERE ts2.trip.id = t.id)")
    Page<Trip> findDepartmentHeadReviewTrips(@Param("departmentId") Integer departmentId, Pageable pageable);

    @Query("SELECT t FROM Trip t JOIN t.tripStatuses ts WHERE ts.status = 'PENDING_EXPENSE_APPROVAL' AND ts.createdAt = (SELECT MAX(ts2.createdAt) FROM TripStatus ts2 WHERE ts2.trip.id = t.id)")
    Page<Trip> findExpenseReviewTrips(Pageable pageable);

    @Query("SELECT t FROM Trip t JOIN t.tripStatuses ts WHERE ts.status = 'AWAITING_PAYMENT' AND ts.createdAt = (SELECT MAX(ts2.createdAt) FROM TripStatus ts2 WHERE ts2.trip.id = t.id)")
    Page<Trip> findPaymentReviewTrips(Pageable pageable);

    @Query("SELECT t FROM Trip t JOIN t.tripStatuses ts WHERE ts.status = 'PENDING_DIRECTOR_APPROVAL' AND ts.createdAt = (SELECT MAX(ts2.createdAt) FROM TripStatus ts2 WHERE ts2.trip.id = t.id)")
    Page<Trip> findDirectorReviewTrips(Pageable pageable);

    @Query("SELECT t FROM Trip t WHERE t.user.id = :userId")
    List<Trip> findByUserId(@Param("userId") Integer userId);
}
