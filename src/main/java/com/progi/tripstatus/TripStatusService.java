package com.progi.tripstatus;

import com.progi.Enum.Status;
import com.progi.trip.Trip;
import com.progi.trip.TripNotificationDTO;
import com.progi.trip.TripResponseDTO;
import com.progi.trip.TripService;
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

@Service
@Transactional
public class TripStatusService {

    @Autowired
    private TripStatusRepository tripStatusRepository;
    @Lazy
    @Autowired
    private TripService tripService;

    public TripStatus getCurrentTripStatus(Integer tripId) {
        return tripStatusRepository.findTopByTripIdOrderByCreatedAtDesc(tripId).orElseThrow(() -> new NoSuchElementException("Trip has no status with tripId  " + tripId));
    }

    public TripStatus createTripStatus(TripStatusDTO tripStatusDTO) {
        TripStatus tripStatus = new TripStatus();

        Trip trip = tripService.getTripById(tripStatusDTO.getTripId());
        tripStatus.setTrip(trip);

        tripStatus.setStatus(tripStatusDTO.getStatus());
        tripStatus.setMessage(tripStatusDTO.getMessage());

        return tripStatusRepository.save(tripStatus);
    }

    public List<TripStatus> getAllTripStatusesByTripId(Integer tripId) {
        return tripStatusRepository.findStatusesByTripIdOrdered(tripId);
    }

    public List<NotificationDTO> getNotifications(Integer userId) {
        List<Trip> trips = tripService.getTripByUserId(userId);

       List<NotificationDTO> notifications = new ArrayList<>();

       for (Trip trip : trips) {
           List<TripStatus> statuses = getAllTripStatusesByTripId(trip.getId());
           TripStatus currentStatus = statuses.isEmpty() ? null : statuses.get(0);
           Status previousStatus = statuses.size() > 1 ? statuses.get(1).getStatus() : null;

           if (currentStatus != null && previousStatus != null) {
               NotificationDTO notification = new NotificationDTO();
               notification.setTrip(new TripNotificationDTO(trip));
               notification.setPreviousTripStatus(previousStatus);
               notification.setNextTripStatus(currentStatus);
               notifications.add(notification);
           }
       }
    return notifications;
    }
}
