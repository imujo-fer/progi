package com.progi.Statistics.dto;

import com.progi.user.dto.UserDetailsDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserStatisticsDTO {
    
    private UserDetailsDTO user;
    private Double eurTotalCost;
    private Long numberOfTrips;

}
