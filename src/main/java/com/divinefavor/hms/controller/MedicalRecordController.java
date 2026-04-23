package com.divinefavor.hms.controller;

import com.divinefavor.hms.model.MedicalRecord;
import com.divinefavor.hms.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/medical-records")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService medicalRecordService;

    @PostMapping
    public ResponseEntity<?> saveConsultationNotes(@RequestBody Map<String, Object> payload) {
        // In this implementation, the payload includes visit_id and the record details
        Long visitId = Long.valueOf(payload.get("visitId").toString());
        MedicalRecord record = new MedicalRecord();
        if (payload.containsKey("symptoms")) {
            record.setSymptoms(payload.get("symptoms").toString());
        }
        if (payload.containsKey("diagnosis")) {
            record.setDiagnosis(payload.get("diagnosis").toString());
        }
        if (payload.containsKey("treatmentPlan")) {
            record.setTreatmentPlan(payload.get("treatmentPlan").toString());
        }
        if (payload.containsKey("prescription")) {
            record.setPrescription(payload.get("prescription").toString());
        }

        String username = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getName();
        MedicalRecord saved = medicalRecordService.saveConsultationNotes(visitId, record, username);
        return ResponseEntity.ok(saved);
    }
}
