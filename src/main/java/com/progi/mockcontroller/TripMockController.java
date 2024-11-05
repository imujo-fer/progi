package com.progi.mockcontroller;


import com.progi.Enum.Status;
import com.progi.Model.*;
import com.progi.dto.EmployeeTripByStatusDTO;
import com.progi.mockdata.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripMockController {

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTrip(@PathVariable int id) {
        Trip trip = MockTrip.generateMockTrips().getFirst();
        Country country = MockCountry.generateMockCountries().getFirst();
        trip.setCountry(country);

        User user = MockUser.generateMockUsers().getFirst();
        Department department = MockDepartment.generateMockDepartments().getFirst();
        Role role = MockRole.generateMockRoles().getFirst();
        user.setDepartment(department);
        user.setRoles(List.of(role));
        user.setTrips(List.of(trip));

        TripStatus tripStatus = MockTripStatus.generateMockTripStatuses().getFirst();
        trip.setTripStatuses(List.of(tripStatus));
        trip.setUser(user);

        return ResponseEntity.ok(trip);
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<TripStatus> getTripStatus(@PathVariable int id) {
        return ResponseEntity.ok(MockTripStatus.generateMockTripStatuses().getFirst());
    }

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip) {
        return ResponseEntity.ok(null);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable Integer id, @RequestBody Trip trip) {
        Trip oldTrip = MockTrip.generateMockTrips().get(id);

        return ResponseEntity.ok(oldTrip);
    }

//    @GetMapping("/employee/{employeeID}")
//    public ResponseEntity<EmployeeTripByStatusDTO> getEmployeeTripsByStatus(
//            @PathVariable int employeeID,
//            @RequestParam(required = false) Status status,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size) {
//
//        Trip trip = MockTrip.generateMockTrips().getFirst();
//        TripStatus tripStatus = MockTripStatus.generateMockTripStatuses().getFirst();
//        ExpenseReport expenseReport = MockExpenseReport.generateMockExpenseReports().getFirst();
//
//        return new EmployeeTripByStatusDTO(
//
//        );
//    }

    @GetMapping("/department-head/{departmentHeadID}")
    public ResponseEntity<Trip> getEmployeeTripsByStatus(
            @PathVariable int departmentHeadID,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        TripStatus tripStatus = MockTripStatus.generateMockTripStatuses().getFirst();

        return ResponseEntity.ok(tripStatus.getTrip());
    }

}
