package com.progi.Statistics;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.progi.Statistics.dto.CostStatisticsDTO;
import com.progi.Statistics.dto.NumberOfTripsStatisticsDTO;
import com.progi.Statistics.dto.UserStatisticsDTO;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("cost/{year}")
    public ResponseEntity<List<CostStatisticsDTO>> getCostStatisticsByYear(Integer year) {
        return ResponseEntity.ok(statisticsService.getCostStatisticsByYear(year));
    }

    @GetMapping("trips/{year}")
    public ResponseEntity<List<NumberOfTripsStatisticsDTO>> getNumberOfTripsStatisticsByYear(Integer year) {
        return ResponseEntity.ok(statisticsService.getNumberOfTripsStatisticsByYear(year));
    }

    @GetMapping("users")
    public ResponseEntity<List<UserStatisticsDTO>> getUserStatistics(
            @RequestParam(value = "dateFrom", required = false) String dateFrom,
            @RequestParam(value = "dateTo", required = false) String dateTo) {
        return ResponseEntity.ok(statisticsService.getUserStatistics(dateFrom, dateTo));
    }
    
}
