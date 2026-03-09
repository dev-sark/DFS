package com.divinefavor.hms.controller;

import com.divinefavor.hms.model.Patient;
import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receptionist")
@PreAuthorize("hasAnyRole('RECEPTIONIST', 'ADMIN')")
public class ReceptionistController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/register")
    public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient) {
        return ResponseEntity.ok(patientService.registerPatient(patient));
    }

    @PostMapping("/check-in/{folderNumber}")
    public ResponseEntity<Visit> checkInPatient(@PathVariable String folderNumber) {
        return ResponseEntity.ok(patientService.checkInPatient(folderNumber));
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/todays-visits")
    public ResponseEntity<List<Visit>> getTodaysVisits() {
        return ResponseEntity.ok(patientService.getTodaysVisits());
    }
}
