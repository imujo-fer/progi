package com.progi.receipt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.progi.receipt.ReceiptService.RECEIPT_DIRECTORY;

@RestController
@RequestMapping("/api/receipts")
public class ReceiptController {
    @Autowired
    private ReceiptService receiptService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)

    public ResponseEntity<Receipt> uploadReceipt(@RequestParam("receipt") MultipartFile file) {
        if (!file.getContentType().equals("application/pdf")) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            Receipt savedReceipt = receiptService.uploadReceipt(file);
            return ResponseEntity.ok(savedReceipt);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<Resource> getReceiptAsPdf(@PathVariable("id") Integer receiptId) {
        try {
            String url = receiptService.getReceiptById(receiptId).getPath();
            Path path = Paths.get(RECEIPT_DIRECTORY).resolve(url.substring(url.lastIndexOf('/') + 1));
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_PDF)
                        .header(HttpHeaders.CONTENT_DISPOSITION,
                                "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
