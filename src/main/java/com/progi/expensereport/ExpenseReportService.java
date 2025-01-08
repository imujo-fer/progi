package com.progi.expensereport;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import com.progi.expensecategory.ExpenseCategory;
import com.progi.expensecategory.ExpenseCategoryDTO;
import com.progi.expensereportitem.ExpenseReportItem;
import com.progi.expensereportitem.ExpenseReportItemInfoDTO;
import com.progi.expensesubcategory.ExpenseSubcategoryDTO;
import com.progi.trip.TripDTO;
import com.progi.user.User;
import com.progi.user.UserService;
import com.progi.user.dto.UserDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progi.expensereportitem.ExpenseReportItemWithSubcategoryDTO;
import com.progi.trip.Trip;
import com.progi.trip.TripService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ExpenseReportService {

        @Autowired
        private ExpenseReportRepository expenseReportRepository;
        @Autowired
        private TripService tripService;

        @Autowired
        private UserService userService;

        public ExpenseReport getExpenseReportById(Integer id) {
                return expenseReportRepository.findById(id).orElseThrow(
                                () -> new NoSuchElementException("Expense report not found with id " + id));
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

        public List<ExpenseReportItemWithSubcategoryDTO> getExpenseReportItems(Integer id) {
                ExpenseReport expenseReport = getExpenseReportById(id);

                return expenseReport.getExpenseReportItems().stream().map(ExpenseReportItemWithSubcategoryDTO::new)
                                .toList();
        }

        public ExpenseReportInfoDTO getExpenseReportItemInfo(Integer id) {
                ExpenseReport expenseReport = getExpenseReportById(id);

                Trip trip = expenseReport.getTrip();
                User user = trip.getUser();

                long tripLengthInDays = java.time.Duration
                                .between(trip.getDatetimeFrom().toInstant(), trip.getDatetimeTo().toInstant()).toDays()
                                + 1;

                double eurDailyWage = trip.getCountry().getEurDailyWage();

                double eurTotalWage = tripLengthInDays * eurDailyWage;

                DailyWageDTO dailyWageDTO = new DailyWageDTO(
                                (int) tripLengthInDays,
                                eurDailyWage,
                                eurTotalWage);

                Double eurExpenseSum = expenseReport.getExpenseReportItems().stream()
                                .mapToDouble(ExpenseReportItem::getEurValue)
                                .sum();

                List<ExpenseCategoryDTO> expenseCategoryDTOs = expenseReport.getExpenseReportItems().stream()
                                .collect(Collectors
                                                .groupingBy(item -> item.getExpenseSubcategory().getExpenseCategory()))
                                .entrySet().stream()
                                .map(entry -> {
                                        ExpenseCategory expenseCategory = entry.getKey();
                                        List<ExpenseReportItemInfoDTO> expenseReportItemInfoDTOs = entry.getValue()
                                                        .stream()
                                                        .map(expenseReportItem -> new ExpenseReportItemInfoDTO(
                                                                        expenseReportItem.getId(),
                                                                        expenseReportItem.getReceipt().getId(),
                                                                        new ExpenseSubcategoryDTO(expenseReportItem
                                                                                        .getExpenseSubcategory()),
                                                                        expenseReportItem.getDescription(),
                                                                        expenseReportItem.getCurrency(),
                                                                        expenseReportItem.getCurrencyValue(),
                                                                        expenseReportItem.getEurValue()))
                                                        .collect(Collectors.toList());

                                        Double eurTotalCost = entry.getValue().stream()
                                                        .mapToDouble(ExpenseReportItem::getEurValue)
                                                        .sum();

                                        return new ExpenseCategoryDTO(
                                                        expenseCategory.getId(),
                                                        expenseCategory.getName(),
                                                        eurTotalCost,
                                                        expenseReportItemInfoDTOs);
                                })
                                .collect(Collectors.toList());

                eurExpenseSum += eurTotalWage;

                return new ExpenseReportInfoDTO(
                                new UserDetailsDTO(user.getId(), user.getEmail(), user.getFirstName(),
                                                user.getLastName(), user.getIban()),
                                new TripDTO(
                                                trip.getCoordinatesLat(), trip.getCoordinatesLon(), trip.getAddress(),
                                                trip.getCity(), trip.getCountry().getCode(), trip.getDatetimeFrom(),
                                                trip.getDatetimeTo(), trip.getReason()),
                                expenseCategoryDTOs,
                                dailyWageDTO,
                                eurExpenseSum);
        }

}
