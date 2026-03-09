package com.divinefavor.hms.service;

import com.divinefavor.hms.model.Patient;
import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.model.VisitStatus;
import com.divinefavor.hms.repository.PatientRepository;
import com.divinefavor.hms.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private VisitRepository visitRepository;

    public Patient registerPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Transactional
    public Visit checkInPatient(String folderNumber) {
        Patient patient = patientRepository.findByFolderNumber(folderNumber)
                .orElseThrow(() -> new RuntimeException("Patient not found with folder number: " + folderNumber));

        Visit visit = new Visit();
        visit.setPatient(patient);
        visit.setStatus(VisitStatus.WAITING_FOR_VITALS);
        visit.setVisitDate(LocalDateTime.now());

        return visitRepository.save(visit);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public List<Visit> getTodaysVisits() {
        // Simple implementation for now, can be filtered by date
        return visitRepository.findAll();
    }
}
