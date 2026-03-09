package com.divinefavor.hms.controller;

import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.divinefavor.hms.model.Invoice;
import com.divinefavor.hms.repository.InvoiceRepository;

@RestController
@RequestMapping("/api/cashier")
@PreAuthorize("hasRole('CASHIER')")
public class CashierController {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @GetMapping("/invoices")
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceRepository.findAllByOrderByCreatedAtDesc());
    }

    @PutMapping("/pay/{id}")
    public ResponseEntity<?> payInvoice(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Invoice invoice = invoiceRepository.findById(id).orElse(null);
        if (invoice == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invoice not found"));
        }

        String paymentMethod = request.getOrDefault("paymentMethod", "CASH");

        invoice.setPaymentStatus("PAID");
        invoice.setPaymentMethod(paymentMethod);
        invoice.setPaidAt(LocalDateTime.now());

        invoiceRepository.save(invoice);

        return ResponseEntity.ok(Map.of("message", "Payment processed successfully", "invoice", invoice));
    }
}
