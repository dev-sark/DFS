package com.divinefavor.hms.service;

import com.divinefavor.hms.model.*;
import com.divinefavor.hms.repository.InvoiceRepository;
import com.divinefavor.hms.repository.LabRequestRepository;
import com.divinefavor.hms.repository.PrescriptionRepository;
import com.divinefavor.hms.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ConsultationService {

    @Autowired
    private VisitRepository visitRepository;

    @Autowired
    private LabRequestRepository labRequestRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Transactional
    public Visit saveExamination(Long visitId, String primaryDiagnosis, List<LabRequest> labRequests,
            List<Prescription> prescriptions) {
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("Visit not found"));

        visit.setPrimaryDiagnosis(primaryDiagnosis);

        if (labRequests != null && !labRequests.isEmpty()) {
            for (LabRequest req : labRequests) {
                req.setVisit(visit);
                labRequestRepository.save(req);

                // Create Invoice for Lab Fee (placeholder amount for now)
                Invoice invoice = new Invoice();
                invoice.setVisit(visit);
                invoice.setItemType("LAB_FEE: " + req.getTestName());
                invoice.setAmount(new BigDecimal("50.00")); // Standard fee
                invoiceRepository.save(invoice);
            }
            visit.setStatus(VisitStatus.WAITING_FOR_LAB);
        } else if (prescriptions != null && !prescriptions.isEmpty()) {
            for (Prescription p : prescriptions) {
                p.setVisit(visit);
                prescriptionRepository.save(p);

                // Create Invoice for Drugs
                Invoice invoice = new Invoice();
                invoice.setVisit(visit);
                invoice.setItemType("DRUG_FEE: " + p.getMedicationName());
                invoice.setAmount(new BigDecimal("20.00")); // Placeholder
                invoiceRepository.save(invoice);
            }
            visit.setStatus(VisitStatus.WAITING_FOR_PHARMACY);
        } else {
            visit.setStatus(VisitStatus.COMPLETED);
        }

        return visitRepository.save(visit);
    }
}
