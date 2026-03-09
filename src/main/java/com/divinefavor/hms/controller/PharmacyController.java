package com.divinefavor.hms.controller;

import com.divinefavor.hms.model.Prescription;
import com.divinefavor.hms.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacy")
@PreAuthorize("hasAnyRole('PHARMACIST', 'ADMIN')")
public class PharmacyController {

    @Autowired
    private PharmacyService pharmacyService;

    @GetMapping("/pending")
    public ResponseEntity<List<Prescription>> getPendingPrescriptions() {
        return ResponseEntity.ok(pharmacyService.getPendingPrescriptions());
    }

    @PostMapping("/dispense/{prescriptionId}")
    public ResponseEntity<Prescription> dispenseMedication(@PathVariable Long prescriptionId) {
        return ResponseEntity.ok(pharmacyService.dispenseMedication(prescriptionId));
    }
}
