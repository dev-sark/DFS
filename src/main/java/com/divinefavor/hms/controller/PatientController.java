package com.divinefavor.hms.controller;

import com.divinefavor.hms.model.Patient;
import com.divinefavor.hms.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        System.out.println("--- PATIENT FETCH SYNC ---");
        System.out.println("Total patients found in DB: " + patients.size());
        patients.forEach(p -> System.out.println(" - Patient: " + p.getFullName() + " (ID: " + p.getId() + ")"));
        return ResponseEntity.ok(patients);
    }

    @PostMapping("/register")
    public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient) {
        System.out.println("--- RECEIVED PATIENT REGISTRATION: " + patient.getFullName() + " ---");
        return ResponseEntity.ok(patientService.registerPatient(patient));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patientUpdates) {
        return ResponseEntity.ok(patientService.updatePatient(id, patientUpdates));
    }
}