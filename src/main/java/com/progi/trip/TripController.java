package com.progi.trip;

import com.progi.Enum.Status;
import com.progi.tripstatus.TripStatus;
import com.progi.department.DepartmentService;
import com.progi.user.User;
import com.progi.user.UserDTO;
import com.progi.user.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private TripService tripService;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Trip> getAllTrips() {
        return tripService.getAllTrips();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripWithCountryDTO> getTripById(@PathVariable Integer id, @RequestParam Integer userId) {
        Trip trip = tripService.getTripById(id);
        User user = userService.getUserbyId(userId);

        TripWithCountryDTO tripDTO = new TripWithCountryDTO(trip);
        tripDTO.setUser(new UserDTO(user));

        if (trip.getUser() != null && trip.getUser().getId().equals(userId)) {
            return ResponseEntity.ok(tripDTO);
        }

        if (user != null && user.getDepartment() != null) {
            List<User> departmentHeads = departmentService.getDepartmentHeadsByDepartmentId(user.getDepartment().getId());

            // Provjeravamo da li je korisnik jedan od department heads
            if (departmentHeads.stream().anyMatch(departmentHead -> departmentHead.getId().equals(userId))) {
                return ResponseEntity.ok(tripDTO);
            }
        }

        return ResponseEntity.status(403).build();
    }

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestParam Integer userId, @RequestBody TripDTO trip) {
        Trip createdTrip = tripService.createTrip(userId, trip);
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

    @GetMapping("/employee/{employeeID}")
    public ResponseEntity<Page<TripResponseDTO>> getEmployeeTripsByStatus(
            @PathVariable int employeeID,
            @RequestParam(required = false) Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Trip> tripsPage = tripService.getTripsByUserAndStatus(employeeID, status, pageRequest);

        // Mapiranje Trip entiteta na TripResponseDTO
        Page<TripResponseDTO> tripResponsePage = tripsPage.map(TripResponseDTO::new);

        return ResponseEntity.ok(tripResponsePage);
    }


}

