package com.progi.trip;

import java.util.List;

import com.progi.tripstatus.TripStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import com.progi.Enum.Status;
import com.progi.auth.UserSessionService;
import com.progi.department.DepartmentService;
import com.progi.tripstatus.TripStatus;
import com.progi.user.User;
import com.progi.user.UserDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private TripService tripService;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private UserSessionService userSessionService;

    @Autowired
    private TripStatusService tripStatusService;

    @GetMapping
    public List<Trip> getAllTrips() {
        return tripService.getAllTrips();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripWithCountryDTO> getTripById(@PathVariable Integer id) {
        try {
            TripWithCountryDTO tripDTO = tripService.getTripByIdIfAccessible(id);
            return ResponseEntity.ok(tripDTO);
        } catch (AccessDeniedException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody TripDTO trip) {
        Trip createdTrip = tripService.createTrip(trip);
        return ResponseEntity.ok(createdTrip);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable Integer id, @Valid @RequestBody TripDTO tripDTO) {
       return  ResponseEntity.ok(tripService.updateTrip(id, tripDTO));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Integer id) {
        tripService.deleteTrip(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("{id}/status")
    public ResponseEntity<TripStatus> getTripStatus(@PathVariable Integer id) {
        return ResponseEntity.ok(tripStatusService.getCurrentTripStatus(id));
    }

    @GetMapping("/employee")
    public ResponseEntity<Page<TripResponseDTO>> getEmployeeTripsByStatus(
            @RequestParam(required = false) Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(tripService.getTripsByUserAndStatus( status, page, size));
    }


}

