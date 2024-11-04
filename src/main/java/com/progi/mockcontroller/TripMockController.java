package com.progi.mockcontroller;


import com.progi.Enum.Status;
import com.progi.Model.ExpenseReport;
import com.progi.Model.Trip;
import com.progi.Model.TripStatus;
import com.progi.dto.EmployeeTripByStatusDTO;
import com.progi.mockdata.MockExpenseReport;
import com.progi.mockdata.MockTrip;
import com.progi.mockdata.MockTripStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips")
public class TripMockController {

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTrip(@PathVariable int id) {
        return ResponseEntity.ok(MockTrip.generateMockTrips().getFirst());
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
