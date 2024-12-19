package com.progi.tripstatus;

import static com.progi.Enum.Status.PENDING_DEPARTMENT_APPROVAL;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.progi.auth.UserSessionService;
import com.progi.trip.Trip;
import com.progi.trip.TripNotificationDTO;
import com.progi.trip.TripService;
import com.progi.user.User;

import jakarta.transaction.Transactional;

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

    public List<NotificationDTO> getNotificationsByUser() {
        User user = userSessionService.getCurrentAuthenticatedUser();
        List<TripStatus> tripStatuses = tripStatusRepository.findAllByUser(user.getId());

        Map<Integer, List<TripStatus>> statusesByTrip = tripStatuses.stream()
            .collect(Collectors.groupingBy(ts -> ts.getTrip().getId()));

        List<NotificationDTO> notifications = new ArrayList<>();
        for (Map.Entry<Integer, List<TripStatus>> entry : statusesByTrip.entrySet()) {
            List<TripStatus> statuses = entry.getValue();

            statuses.sort(Comparator.comparing(TripStatus::getCreatedAt));

            for (int i = 1; i < statuses.size(); i++) {
                TripStatus prevStatus = statuses.get(i - 1);
                TripStatus currStatus = statuses.get(i);

                NotificationDTO notification = new NotificationDTO();
                notification.setTrip(new TripNotificationDTO(currStatus.getTrip()));
                notification.setPreviousTripStatusStatus(prevStatus.getStatus());
                notification.setNextTripStatus(currStatus);

                notifications.add(notification);
            }
        }

        return notifications;
    }
}
