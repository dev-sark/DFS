package com.divinefavor.hms.service;

import com.divinefavor.hms.model.MedicalRecord;
import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.model.User;
import com.divinefavor.hms.repository.MedicalRecordRepository;
import com.divinefavor.hms.repository.VisitRepository;
import com.divinefavor.hms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private VisitRepository visitRepository;

    @Autowired
    private UserRepository userRepository;

    public MedicalRecord saveConsultationNotes(Long visitId, MedicalRecord record, String username) {
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("Visit not found"));

        // Link the doctor for performance monitoring
        User doctor = userRepository.findByUsername(username).orElse(null);
        record.setDoctor(doctor);

        // Update the visit status so they leave the Doctor's queue
        visit.setStatus("WAITING_FOR_PHARMACY");
        visitRepository.save(visit);

        // Check if there is already a medical record for this visit
        Optional<MedicalRecord> existing = medicalRecordRepository.findByVisitId(visitId);
        if (existing.isPresent()) {
            MedicalRecord current = existing.get();
            current.setSymptoms(record.getSymptoms());
            current.setDiagnosis(record.getDiagnosis());
            current.setTreatmentPlan(record.getTreatmentPlan());
            current.setPrescription(record.getPrescription());
            return medicalRecordRepository.save(current);
        }

        record.setVisit(visit);
        return medicalRecordRepository.save(record);
    }

    public Optional<MedicalRecord> getRecordForVisit(Long visitId) {
        return medicalRecordRepository.findByVisitId(visitId);
    }
}
