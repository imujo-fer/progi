package com.progi.Statistics;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.progi.Statistics.dto.CostStatisticsDTO;
import com.progi.Statistics.dto.NumberOfTripsStatisticsDTO;

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
    
}
