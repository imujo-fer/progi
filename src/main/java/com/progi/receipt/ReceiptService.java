package com.progi.receipt;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Transactional
public class ReceiptService {

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
}
