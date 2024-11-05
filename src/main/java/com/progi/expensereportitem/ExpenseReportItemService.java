package com.progi.expensereportitem;

import com.progi.expensesubcategory.ExpenseSubcategory;
import com.progi.expensesubcategory.ExpenseSubcategoryService;
import com.progi.receipt.Receipt;
import com.progi.expensereport.ExpenseReport;
import com.progi.expensereport.ExpenseReportService;
import com.progi.receipt.ReceiptService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Transactional
public class ExpenseReportItemService {

    @Autowired
    private ExpenseReportItemRepository expenseReportItemRepository;
    @Autowired
    private ExpenseReportService expenseReportService;
    @Autowired
    private ReceiptService receiptService;
    @Autowired
    private ExpenseSubcategoryService expenseSubcategoryService;

    public ExpenseReportItem getExpenseReportItemById(Integer id) {
        return expenseReportItemRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Expense report item not found with id " + id));
    }

    public void deleteExpenseReportItem(Integer id) {
        if (!expenseReportItemRepository.existsById(id)) {
            throw new NoSuchElementException("Expense report item not found with id " + id);
        }
        expenseReportItemRepository.deleteById(id);
    }

    public ExpenseReportItem createExpenseReportItem(ExpenseReportItemDTO expenseReportItemDTO) {
        ExpenseReportItem expenseReportItem = new ExpenseReportItem();

        ExpenseReport expenseReport = expenseReportService.getExpenseReportById(expenseReportItemDTO.getExpenseReportId());
        expenseReportItem.setExpenseReport(expenseReport);

        Receipt receipt = receiptService.getReceiptById(expenseReportItemDTO.getReceiptId());
        expenseReportItem.setReceipt(receipt);

        ExpenseSubcategory expenseSubcategory = expenseSubcategoryService.getExpenseSubcategoryById(expenseReportItemDTO.getExpenseSubcategoryId());
        expenseReportItem.setExpenseSubcategory(expenseSubcategory);

        expenseReportItem.setDescription(expenseReportItemDTO.getDescription());
        expenseReportItem.setCurrency(expenseReportItemDTO.getCurrency());
        expenseReportItem.setCurrencyValue(expenseReportItemDTO.getCurrencyValue());
        expenseReportItem.setEurValue(expenseReportItemDTO.getEurValue());

        return expenseReportItemRepository.save(expenseReportItem);
    }

    public ExpenseReportItem updateExpenseReportItem(Integer id, ExpenseReportItemDTO expenseReportItemDTO) {
        ExpenseReportItem expenseReportItem = getExpenseReportItemById(id);

        ExpenseReport expenseReport = expenseReportService.getExpenseReportById(expenseReportItemDTO.getExpenseReportId());
        expenseReportItem.setExpenseReport(expenseReport);

        Receipt receipt = receiptService.getReceiptById(expenseReportItemDTO.getReceiptId());
        expenseReportItem.setReceipt(receipt);

        ExpenseSubcategory expenseSubcategory = expenseSubcategoryService.getExpenseSubcategoryById(expenseReportItemDTO.getExpenseSubcategoryId());
        expenseReportItem.setExpenseSubcategory(expenseSubcategory);

        expenseReportItem.setDescription(expenseReportItemDTO.getDescription());
        expenseReportItem.setCurrency(expenseReportItemDTO.getCurrency());
        expenseReportItem.setCurrencyValue(expenseReportItemDTO.getCurrencyValue());
        expenseReportItem.setEurValue(expenseReportItemDTO.getEurValue());

        return expenseReportItemRepository.save(expenseReportItem);
    }


}
