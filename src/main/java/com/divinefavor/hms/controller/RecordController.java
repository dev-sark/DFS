package com.divinefavor.hms.controller;

import com.divinefavor.hms.model.Patient;
import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.repository.PatientRepository;
import com.divinefavor.hms.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
public class RecordController {

    @Autowired
    private VisitRepository visitRepository;

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(patientRepository.findAll());
    }

    @GetMapping("/records")
    public ResponseEntity<List<Visit>> getAllMedicalRecords() {
        // Return visits ordered by newest first
        return ResponseEntity.ok(visitRepository.findAllByOrderByVisitDateDesc());
    }
}
