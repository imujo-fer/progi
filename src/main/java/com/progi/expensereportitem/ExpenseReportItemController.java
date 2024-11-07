package com.progi.expensereportitem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;

import static com.progi.receipt.ReceiptService.RECEIPT_DIRECTORY;

@RestController
@RequestMapping("/api/expense-report-items")
public class ExpenseReportItemController {

    @Autowired
    private ExpenseReportItemService expenseReportItemService;

    @PostMapping
    public ResponseEntity<ExpenseReportItem> createExpenseReportItem(@RequestBody ExpenseReportItemDTO expenseReportItemDTO) {
        return ResponseEntity.ok(expenseReportItemService.createExpenseReportItem(expenseReportItemDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseReportItem> updateExpenseReportItem(
            @PathVariable Integer id,
            @RequestBody ExpenseReportItemDTO expenseReportItemDTO) {
        return ResponseEntity.ok(expenseReportItemService.updateExpenseReportItem(id, expenseReportItemDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpenseReportItem(@PathVariable Integer id) {
        expenseReportItemService.deleteExpenseReportItem(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/receipts/{id}")
    public ResponseEntity<String> uploadReceipt(@PathVariable("id") Integer id,
                                                  @RequestParam("receipt") MultipartFile file) {
        try {
            expenseReportItemService.uploadReceipt(id, file);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading receipt: " + e.getMessage());
        }

        return ResponseEntity.ok("Receipt uploaded successfully");
    }

    @GetMapping("/receipts/{filename}")
    public ResponseEntity<Resource> getReceipt(@PathVariable String filename) {
        try {
            Path path = Paths.get(RECEIPT_DIRECTORY).resolve(filename);
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

}
