package com.divinefavor.hms.controller;

import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.service.TriageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nurse")
@PreAuthorize("hasAnyRole('NURSE', 'ADMIN')")
public class TriageController {

    @Autowired
    private TriageService triageService;

    @GetMapping("/queue")
    public ResponseEntity<List<Visit>> getWaitingQueue() {
        return ResponseEntity.ok(triageService.getWaitingForVitalsQueue());
    }

    @PostMapping("/capture-vitals/{visitId}")
    public ResponseEntity<Visit> captureVitals(
            @PathVariable Long visitId,
            @RequestParam Double temp,
            @RequestParam String bp,
            @RequestParam Integer heartRate,
            @RequestParam Double weight,
            @RequestParam(defaultValue = "false") boolean urgent,
            @RequestParam(required = false) String notes) {

        return ResponseEntity.ok(triageService.captureVitals(visitId, temp, bp, heartRate, weight, urgent, notes));
    }
}
