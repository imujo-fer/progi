package com.progi.trip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.progi.Enum.Status;
import com.progi.tripstatus.TripStatus;
import com.progi.tripstatus.TripStatusService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private TripService tripService;

    @Autowired
    private TripStatusService tripStatusService;

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

    @GetMapping("/department-head")
    public ResponseEntity<Page<TripResponseDTO>> getDepartmentApprovalTrips(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        

        return ResponseEntity.ok(tripService.getDepartmentApprovalTrip(page, size));
    }

    @GetMapping("/accountant-expense")
    public ResponseEntity<Page<TripResponseDTO>> getExpenseApprovalTrips(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        

        return ResponseEntity.ok(tripService.getExpenseApprovalTrip(page, size));
    }

    @GetMapping("/accountant-payment")
    public ResponseEntity<Page<TripResponseDTO>> getPaymentApprovalTrips(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        

        return ResponseEntity.ok(tripService.getPaymentApprovalTrip(page, size));
    }

    @GetMapping("/director")
    public ResponseEntity<Page<TripResponseDTO>> getDirectorApprovalTrips(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        

        return ResponseEntity.ok(tripService.getDirectorApprovalTrip(page, size));
    }


}

