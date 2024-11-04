package com.progi.mockdata;

import com.progi.Enum.Status;
import com.progi.Model.TripStatus;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class MockTripStatus {
    public static List<TripStatus> generateMockTripStatuses() {
        List<TripStatus> statuses = new ArrayList<>();
        statuses.add(new TripStatus(1, Status.PENDING_DEPARTMENT_APPROVAL, new Timestamp(System.currentTimeMillis()), MockTrip.generateMockTrips().getFirst(), "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
        statuses.add(new TripStatus(2,  Status.EXPENSE_APPROVAL_REJECTED, new Timestamp(System.currentTimeMillis()), MockTrip.generateMockTrips().getLast(), "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
        return statuses;
    }
}
