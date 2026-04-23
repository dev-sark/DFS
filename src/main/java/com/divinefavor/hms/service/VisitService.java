package com.divinefavor.hms.service;

import com.divinefavor.hms.model.Patient;
import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.model.User;
import com.divinefavor.hms.repository.PatientRepository;
import com.divinefavor.hms.repository.VisitRepository;
import com.divinefavor.hms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitService {

    @Autowired
    private VisitRepository visitRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Visit> getVisitsByPatientId(Long patientId) {
        return visitRepository.findByPatientId(patientId);
    }

    public Visit saveVitals(Long patientId, Visit visitDetails, String username) {
        try {
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));
            
            // Link the nurse for performance tracking
            User nurse = userRepository.findByUsername(username).orElse(null);
            visitDetails.setNurse(nurse);

            visitDetails.setPatient(patient);
            return visitRepository.save(visitDetails);
        } catch (Exception e) {
            System.err.println("=== SAVE VITALS ERROR ===");
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public Visit getVisitById(Long id) {
        return visitRepository.findById(id).orElseThrow(() -> new RuntimeException("Visit not found"));
    }

    public List<Visit> getVisitsByStatus(String status) {
        return visitRepository.findByStatus(status);
    }
}
