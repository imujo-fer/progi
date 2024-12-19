package com.progi.receipt;

import com.progi.expensereportitem.ExpenseReportItem;
import com.progi.expensereportitem.ExpenseReportItemService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Transactional
public class ReceiptService {

    public static final String RECEIPT_DIRECTORY = System.getProperty("user.home") + "/Downloads/receipts";

    @Autowired
    private ReceiptRepository receiptRepository;

    public Receipt getReceiptById(Integer id) {
        return receiptRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Receipt not found with id " + id));
    }

    public void deleteReceipt(Integer id) {
        if (!receiptRepository.existsById(id)) {
            throw new NoSuchElementException("Receipt not found with id " + id);
        }
        receiptRepository.deleteById(id);
    }

    public Receipt uploadReceipt(MultipartFile file) {

        Receipt receipt = new Receipt();
        String receiptUrl = receiptFunction.apply(file);

        receipt.setPath(receiptUrl);
        receipt = receiptRepository.save(receipt);

        return receipt;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename)
            .filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1))
            .orElse(".pdf");

    private final Function<MultipartFile, String> receiptFunction = (file) -> {
        String filename =  System.currentTimeMillis() + fileExtension.apply(file.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(RECEIPT_DIRECTORY).toAbsolutePath().normalize();

            if (!Files.exists(fileStorageLocation))
                Files.createDirectories(fileStorageLocation);

            Files.copy(file.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);

            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/receipt/" + filename)
                    .toUriString();
        } catch (Exception e) {
            throw new RuntimeException("Unable to save receipt");
        }
    };
}
