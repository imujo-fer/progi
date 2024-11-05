package com.progi.tripstatus;

import com.progi.Enum.Status;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TripStatusDTO {
    @NotNull
    private Status status;

    @NotNull
    private Integer tripId;

    private String message;
}
