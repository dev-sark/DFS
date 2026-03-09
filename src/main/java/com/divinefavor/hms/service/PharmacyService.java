package com.divinefavor.hms.service;

import com.divinefavor.hms.model.Prescription;
import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.model.VisitStatus;
import com.divinefavor.hms.repository.PrescriptionRepository;
import com.divinefavor.hms.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PharmacyService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private VisitRepository visitRepository;

    public List<Prescription> getPendingPrescriptions() {
        return prescriptionRepository.findByDispensed(false);
    }

    @Transactional
    public Prescription dispenseMedication(Long prescriptionId) {
        Prescription prescription = prescriptionRepository.findById(prescriptionId)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        prescription.setDispensed(true);

        // If all prescriptions for this visit are dispensed, mark visit as DISPENSED
        Visit visit = prescription.getVisit();
        // Simplified: marking visit status as DISPENSED on each dispensing for now
        visit.setStatus(VisitStatus.DISPENSED);
        visitRepository.save(visit);

        return prescriptionRepository.save(prescription);
    }
}
