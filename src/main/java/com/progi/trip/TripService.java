package com.progi.trip;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.progi.Enum.Status;
import com.progi.auth.UserSessionService;
import com.progi.country.Country;
import com.progi.country.CountryService;
import com.progi.department.Department;
import com.progi.tripstatus.TripStatusDTO;
import com.progi.tripstatus.TripStatusService;
import com.progi.user.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Lazy
    @Autowired
    private TripStatusService tripStatusService;

    @Autowired
    private CountryService countryService;

    @Autowired
    private UserSessionService userSessionService;

    public List<TripResponseDTO> getAllTrips() {
        return tripRepository.findAll().stream().map(TripResponseDTO::new).toList();
    }

    public Trip getTripById(Integer id) {
        return tripRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Trip not found with id " + id));

    }

    public Trip createTrip(TripDTO tripDetails) {
        User user = userSessionService.getCurrentAuthenticatedUser();
        Trip trip = new Trip();

        trip.setCoordinatesLat(tripDetails.getCoordinatesLat());
        trip.setCoordinatesLon(tripDetails.getCoordinatesLon());
        trip.setCity(tripDetails.getCity());
        Country country = countryService.getCountryByCode(tripDetails.getCountryCode());
        if (country != null) {
            trip.setCountry(country);
        }
        trip.setDatetimeFrom(tripDetails.getDatetimeFrom());
        trip.setDatetimeTo(tripDetails.getDatetimeTo());
        trip.setReason(tripDetails.getReason());
        trip.setUser(user);
        trip.setAddress(tripDetails.getAddress());
        trip = tripRepository.save(trip);

        tripStatusService.createFirstTripStatus(trip.getId());

        return trip;
    }

    public Trip updateTrip(Integer id, TripDTO tripDetails) {
        Trip trip = getTripById(id);

        trip.setCoordinatesLat(tripDetails.getCoordinatesLat());
        trip.setCoordinatesLon(tripDetails.getCoordinatesLon());
        trip.setCity(tripDetails.getCity());
        Country country = countryService.getCountryByCode(tripDetails.getCountryCode());
        if (country != null) {
            trip.setCountry(country);
        }

        Country newCountry = new Country();
        newCountry.setCode(tripDetails.getCountryCode());
        trip.setCountry(newCountry);

        trip.setDatetimeFrom(tripDetails.getDatetimeFrom());
        trip.setDatetimeTo(tripDetails.getDatetimeTo());
        trip.setReason(tripDetails.getReason());
        trip.setAddress(tripDetails.getAddress());

        tripStatusService.createTripStatus(new TripStatusDTO( Status.PENDING_DEPARTMENT_APPROVAL, id, null));

        return tripRepository.save(trip);
    }

    public void deleteTrip(Integer id) {
        if (!tripRepository.existsById(id)) {
            throw new NoSuchElementException("Trip not found with id " + id);
        }
        tripRepository.deleteById(id);
    }

    public Page<TripResponseDTO> getTripsByUserAndStatus(Status status, int page, int size) {
        User user = userSessionService.getCurrentAuthenticatedUser();
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Trip> trips;
        if (status == null) {
            trips = tripRepository.findByUserId(user.getId(), pageRequest);
        } else {
            trips = tripRepository.findByUserIdAndStatus(user.getId(), status, pageRequest);
        }

        return trips.map(TripResponseDTO::new);
    }

    public Page<TripResponseDTO> getDepartmentApprovalTrip(int page, int size) {
        User user = userSessionService.getCurrentAuthenticatedUser();

        if (!user.isUserDepartmentHead())
            throw new IllegalArgumentException("User is not department head");

        Department department = user.getDepartment();

        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Trip> trips = tripRepository.findDepartmentHeadReviewTrips(department.getId(), pageable);

        return trips.map(TripResponseDTO::new);
    }

    public Page<TripResponseDTO> getExpenseApprovalTrip(int page, int size) {
        User user = userSessionService.getCurrentAuthenticatedUser();

        if (!user.isUserAccountant())
            throw new IllegalArgumentException("User is not accountant");

        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Trip> trips = tripRepository.findExpenseReviewTrips(pageable);

        return trips.map(TripResponseDTO::new);
    }

    public Page<TripResponseDTO> getPaymentApprovalTrip(int page, int size) {
        User user = userSessionService.getCurrentAuthenticatedUser();

        if (!user.isUserAccountant())
            throw new IllegalArgumentException("User is not accountant");

        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Trip> trips = tripRepository.findPaymentReviewTrips(pageable);

        return trips.map(TripResponseDTO::new);
    }

    public Page<TripResponseDTO> getDirectorApprovalTrip(int page, int size) {
        User user = userSessionService.getCurrentAuthenticatedUser();

        if (!user.isUserDirector())
            throw new IllegalArgumentException("User is not director");

        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Trip> trips = tripRepository.findDirectorReviewTrips(pageable);

        return trips.map(TripResponseDTO::new);
    }

    public Page<Trip> getTripByUserId(Integer userId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return tripRepository.findByUserId(userId, pageRequest);
    }

    public TripWithCountryDTO getTripByIdIfAccessible(Integer tripId) {
        User user = userSessionService.getCurrentAuthenticatedUser();

        if (user == null) {
            throw new AccessDeniedException("User is not authenticated.");
        }

        Trip trip = getTripById(tripId);

        if (canAccessTrip(user, trip)) {
            return new TripWithCountryDTO(trip);
        } else {
            throw new AccessDeniedException("User does not have access to this trip.");
        }
    }

    private boolean canAccessTrip(User user, Trip trip) {
        boolean isUserTripOwner = trip.getUser() != null && trip.getUser().equals(user);
        boolean isUserDepartmentHead = user.isUserDepartmentHead();

        return isUserTripOwner || isUserDepartmentHead;
    }

}
