package com.divinefavor.hms.service;

import com.divinefavor.hms.model.Invoice;
import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.model.VisitStatus;
import com.divinefavor.hms.repository.InvoiceRepository;
import com.divinefavor.hms.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FinanceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private VisitRepository visitRepository;

    public List<Invoice> getUnpaidInvoices() {
        return invoiceRepository.findByPaymentStatus("UNPAID");
    }

    @Transactional
    public Invoice processPayment(Long invoiceId, String method) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        invoice.setPaymentStatus("PAID");
        invoice.setPaymentMethod(method);
        invoice.setPaidAt(LocalDateTime.now());

        // Update visit status if necessary
        Visit visit = invoice.getVisit();
        visit.setStatus(VisitStatus.COMPLETED);
        visitRepository.save(visit);

        return invoiceRepository.save(invoice);
    }
}
