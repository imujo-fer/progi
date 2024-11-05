package com.progi.trip;

import com.progi.Enum.Status;
import com.progi.country.Country;
import com.progi.country.CountryRepository;
import com.progi.country.CountryService;
import com.progi.tripstatus.TripStatus;
import com.progi.tripstatus.TripStatusRepository;
import com.progi.tripstatus.TripStatusService;
import com.progi.user.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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
    private UserService userService;

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public Trip getTripById(Integer id) {
        return tripRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Trip not found with id " + id));


    }

    public Trip createTrip(Integer userId, TripDTO tripDetails) {
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
        trip.setUser(userService.getUserbyId(userId));
        return tripRepository.save(trip);    }

    public Trip updateTrip(Integer id, TripDTO tripDetails) {
        Trip trip = getTripById(id);

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

        return tripRepository.save(trip);
    }


    public void deleteTrip(Integer id) {
        if (!tripRepository.existsById(id)) {
            throw new NoSuchElementException("Trip not found with id " + id);
        }
        tripRepository.deleteById(id);
    }

    public TripStatus getCurrentTripStatus(Integer id) {
        return tripStatusService.getCurrentTripStatus(id);
    }

    public Page<Trip> getTripsByUserAndStatus(Integer userId, Status status, Pageable pageable) {
        return tripRepository.findByUserIdAndStatus(userId, status, pageable);
    }

    public List<Trip> getTripByUserId(Integer userId) {
        return tripRepository.findByUserId(userId);
    }
}
