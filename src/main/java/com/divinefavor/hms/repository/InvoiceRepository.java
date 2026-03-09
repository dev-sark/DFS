package com.divinefavor.hms.repository;

import com.divinefavor.hms.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByPaymentStatus(String status);

    List<Invoice> findAllByOrderByCreatedAtDesc();
}
