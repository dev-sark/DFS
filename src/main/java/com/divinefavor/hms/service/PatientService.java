package com.divinefavor.hms.service;

import com.divinefavor.hms.model.Patient;
import com.divinefavor.hms.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient registerPatient(Patient patient) {
        patient.setFolderNumber("F-" + System.currentTimeMillis());
        return patientRepository.save(patient);
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Patient updatePatient(Long id, Patient updates) {
        return patientRepository.findById(id).map(patient -> {
            if (updates.getFullName() != null)
                patient.setFullName(updates.getFullName());
            if (updates.getTelephone() != null)
                patient.setTelephone(updates.getTelephone());
            if (updates.getGender() != null)
                patient.setGender(updates.getGender());
            if (updates.getDateOfBirth() != null)
                patient.setDateOfBirth(updates.getDateOfBirth());
            return patientRepository.save(patient);
        }).orElseThrow(() -> new RuntimeException("Patient not found"));
    }
}
