package com.progi.trip;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping
    public List<Trip> getAllTrips() {
        return tripService.getAllTrips();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripWithCountryDTO> getTripById(@PathVariable Integer id) {
        User user = userSessionService.getCurrentAuthenticatedUser();
        Trip trip = tripService.getTripById(id);

        TripWithCountryDTO tripDTO = new TripWithCountryDTO(trip);

        boolean isUserTripOwner = trip.getUser() != null && trip.getUser().equals(user);

        if (isUserTripOwner) {
            return ResponseEntity.ok(tripDTO);
        }

        if (user != null && user.getDepartment() != null) {
            List<User> departmentHeads = departmentService.getDepartmentHeadsByDepartmentId(user.getDepartment().getId());

            boolean isUserDepartmentHead = departmentHeads.stream().anyMatch(departmentHead -> departmentHead.equals(user));

            if (isUserDepartmentHead) {
                return ResponseEntity.ok(tripDTO);
            }
        }

        return ResponseEntity.status(403).build();
    }

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody TripDTO trip) {
        Trip createdTrip = tripService.createTrip(trip);
        return ResponseEntity.ok(createdTrip);
    }

    @PatchMapping("/{id}")
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
        return ResponseEntity.ok(tripService.getCurrentTripStatus(id));
    }

    @GetMapping("/employee")
    public ResponseEntity<Page<TripResponseDTO>> getEmployeeTripsByStatus(
            @RequestParam(required = false) Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Trip> tripsPage = tripService.getTripsByUserAndStatus( status, pageRequest);

        // Mapiranje Trip entiteta na TripResponseDTO
        Page<TripResponseDTO> tripResponsePage = tripsPage.map(TripResponseDTO::new);

        return ResponseEntity.ok(tripResponsePage);
    }


}

