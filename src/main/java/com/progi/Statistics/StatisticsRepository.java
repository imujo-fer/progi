package com.progi.Statistics;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.progi.Statistics.dto.CostStatisticsDTO;
import com.progi.Statistics.dto.NumberOfTripsStatisticsDTO;
import com.progi.trip.Trip;

public interface StatisticsRepository extends JpaRepository<Trip, Long> {
    
    @Query("SELECT new com.progi.Statistics.dto.CostStatisticsDTO(" +
    "   EXTRACT(MONTH FROM t.datetimeTo), " +
    "   SUM(e.eurTotalCost) " +
    ") " +
    "FROM Trip t " +
    "JOIN t.expenseReport e " +
    "JOIN t.tripStatuses ts " +
    "JOIN t.user o " +
    "WHERE ts.status = 'PAID' " +
    "AND EXTRACT(YEAR FROM t.datetimeTo) = :year " +
    "AND (:departmentId IS NULL OR o.department.id = :departmentId) " +
    "GROUP BY EXTRACT(MONTH FROM t.datetimeTo)")
    List<CostStatisticsDTO> findMonthlyCostStatistics(@Param("year") int year, @Param("departmentId") Integer departmentId);

    @Query("SELECT new com.progi.Statistics.dto.NumberOfTripsStatisticsDTO(" +
    "   EXTRACT(MONTH FROM t.datetimeTo), " +
    "   COUNT(t) " +
    ") " +
    "FROM Trip t " +
    "JOIN t.tripStatuses ts " +
    "JOIN t.user o " +
    "WHERE ts.status = 'PAID' " +
    "AND EXTRACT(YEAR FROM t.datetimeTo) = :year " +
    "AND (:departmentId IS NULL OR o.department.id = :departmentId) " +
    "GROUP BY EXTRACT(MONTH FROM t.datetimeTo)")
    List<NumberOfTripsStatisticsDTO> findMonthlyNumberOfTripsStatistics(@Param("year") int year, @Param("departmentId") Integer departmentId);
   

}
