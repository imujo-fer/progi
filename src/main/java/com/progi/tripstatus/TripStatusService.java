package com.progi.tripstatus;

import com.progi.Enum.Status;
import com.progi.auth.UserSessionService;
import com.progi.trip.Trip;
import com.progi.trip.TripNotificationDTO;
import com.progi.trip.TripResponseDTO;
import com.progi.trip.TripService;
import com.progi.user.User;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static com.progi.Enum.Status.PENDING_DEPARTMENT_APPROVAL;

@Service
@Transactional
public class TripStatusService {

    @Autowired
    private TripStatusRepository tripStatusRepository;
    @Lazy
    @Autowired
    private TripService tripService;

    @Autowired
    private UserSessionService userSessionService;

    public TripStatus getCurrentTripStatus(Integer tripId) {
        List<TripStatus> tripStatuses = tripStatusRepository.findStatusesByTripIdOrdered(tripId);
        return tripStatuses.stream().findFirst().orElseThrow(() -> new NoSuchElementException("Trip has no status " + tripId));
    }

    public TripStatus createTripStatus(TripStatusDTO tripStatusDTO) {
        TripStatus tripStatus = new TripStatus();

        Trip trip = tripService.getTripById(tripStatusDTO.getTripId());
        tripStatus.setTrip(trip);

        tripStatus.setStatus(tripStatusDTO.getStatus());
        tripStatus.setMessage(tripStatusDTO.getMessage());

        return tripStatusRepository.save(tripStatus);
    }

    public void createFirstTripStatus(Integer tripId) {
        TripStatus tripStatus = new TripStatus();

        tripStatus.setTrip(tripService.getTripById(tripId));
        tripStatus.setStatus(PENDING_DEPARTMENT_APPROVAL);

        tripStatusRepository.save(tripStatus);
    }

    public List<TripStatus> getAllTripStatusesByTripId(Integer tripId) {
        return tripStatusRepository.findStatusesByTripIdOrdered(tripId);
    }

    public List<NotificationDTO> getNotifications() {
        User user = userSessionService.getCurrentAuthenticatedUser();
        List<TripStatus> statuses = tripStatusRepository.findStatusesByUserIdOrdered(user.getId());
        

       List<NotificationDTO> notifications = new ArrayList<>();

    for (int i = 0; i < statuses.size() - 1; i++) {
        TripStatus currentStatus = statuses.get(i);
        TripStatus previousStatus = statuses.get(i + 1);

        NotificationDTO notification = new NotificationDTO();
        notification.setTrip(new TripNotificationDTO(currentStatus.getTrip()));
        notification.setPreviousTripStatusStatus(previousStatus.getStatus());
        notification.setNextTripStatus(currentStatus);

        notifications.add(notification);
    }
    
    return notifications;
    }
}
