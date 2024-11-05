package com.progi.expensereport;

import com.progi.country.Country;
import com.progi.trip.Trip;
import com.progi.trip.TripService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Transactional
public class ExpenseReportService {

    @Autowired
    private ExpenseReportRepository expenseReportRepository;
    @Autowired
    private TripService tripService;


    public ExpenseReport getExpenseReportById(Integer id) {
        return expenseReportRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Expense report not found with id " + id));
    }

    public void deleteExpenseReport(Integer id) {
        if (!expenseReportRepository.existsById(id)) {
            throw new NoSuchElementException("Expense report not found with id " + id);
        }
        expenseReportRepository.deleteById(id);
    }

    public ExpenseReport createExpenseReport(Integer tripId) {
        ExpenseReport expenseReport = new ExpenseReport();
        Trip trip = tripService.getTripById(tripId);

        expenseReport.setTrip(trip);

        return expenseReportRepository.save(expenseReport);
    }
}
