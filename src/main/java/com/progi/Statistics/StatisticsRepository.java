package com.progi.Statistics;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.progi.Statistics.dto.CostStatisticsDTO;
import com.progi.trip.Trip;

public interface StatisticsRepository extends JpaRepository<Trip, Long> {
    
    @Query("SELECT new com.progi.Statistics.dto.CostStatisticsDTO(" +
    "   FUNCTION('MONTH', t.datetimeTo), " +
    "   SUM(er.eurTotalCost)" +
    ") " +
    "FROM Trip t " +
    "JOIN t.expenseReport er " +
    "JOIN t.tripStatuses ts " +
    "JOIN t.user u " +
    "WHERE ts.status = com.progi.Enum.Status.PAID " +
    "  AND FUNCTION('YEAR', t.datetimeTo) = :year " +
    "  AND (:departmentId IS NULL OR u.department.id = :departmentId) " +
    "GROUP BY FUNCTION('MONTH', t.datetimeTo) " +
    "ORDER BY FUNCTION('MONTH', t.datetimeTo)")
    List<CostStatisticsDTO> findMonthlyCostStatistics(
            @Param("year") int year,
            @Param("departmentId") Integer departmentId
    );
}
