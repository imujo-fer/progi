package com.progi.Statistics;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progi.Statistics.dto.CostStatisticsDTO;
import com.progi.auth.UserSessionService;
import com.progi.user.User;

import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class StatisticsService {

    @Autowired
    private StatisticsRepository statisticsRepository;
    @Autowired
    private UserSessionService userSessionService;
    
    public List<CostStatisticsDTO> getCostStatisticsByYear(Integer year) {
        User user = userSessionService.getCurrentAuthenticatedUser();

        if (!user.isUserDepartmentHead() && !user.isUserDirector()){
            throw new RuntimeException("User is not authorized to view statistics");
        }

        Integer departmentId = null;

        if (user.isUserDepartmentHead()){
            departmentId = user.getDepartment().getId();
        }
        
        List<CostStatisticsDTO> stats = statisticsRepository.findMonthlyCostStatistics(year, departmentId);

        Map<java.time.Month, CostStatisticsDTO> statsMap = new HashMap<>();
        for (CostStatisticsDTO stat : stats) {
            statsMap.put(stat.getMonth(), stat);
        }

        List<CostStatisticsDTO> completeStats = new ArrayList<>();
        for (java.time.Month month : java.time.Month.values()) {
            if (statsMap.containsKey(month)) {
            completeStats.add(statsMap.get(month));
            } else {
            CostStatisticsDTO emptyStat = new CostStatisticsDTO();
            emptyStat.setMonth(month);
            emptyStat.setEurCost(0D);
            completeStats.add(emptyStat);
            }
        }

        return completeStats;
    }
}