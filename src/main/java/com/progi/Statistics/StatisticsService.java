package com.progi.Statistics;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progi.Statistics.dto.CostStatisticsDTO;
import com.progi.auth.UserSessionService;
import com.progi.user.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class StatisticsService {

    @Autowired
    private StatisticsRepository statisticsRepository;
    @Autowired
    private UserSessionService userSessionService;
    
    public List<CostStatisticsDTO> getCostStatisticsByYear(Integer year) {
        User user = userSessionService.getCurrentAuthenticatedUser();

        Integer departmentId = user.getDepartment() != null ? user.getDepartment().getId() : null;
        
        return statisticsRepository.findMonthlyCostStatistics(year, departmentId);
    }
}
