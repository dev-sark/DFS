package com.divinefavor.hms.controller;

import com.divinefavor.hms.repository.PatientRepository;
import com.divinefavor.hms.repository.UserRepository;
import com.divinefavor.hms.repository.VisitRepository;
import com.divinefavor.hms.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AnalyticsController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VisitRepository visitRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Long>> getSummary() {
        Map<String, Long> summary = new HashMap<>();
        summary.put("totalPatients", patientRepository.count());
        summary.put("totalStaff", userRepository.count());
        summary.put("totalVisits", visitRepository.count());
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/staff-performance")
    public ResponseEntity<List<Map<String, Object>>> getStaffPerformance() {
        List<com.divinefavor.hms.model.User> staff = userRepository.findAll();
        List<Map<String, Object>> performance = new ArrayList<>();

        for (com.divinefavor.hms.model.User user : staff) {
            Map<String, Object> staffData = new HashMap<>();
            staffData.put("id", user.getId());
            staffData.put("username", user.getUsername());
            staffData.put("role", user.getRole());

            long actions = 0;
            if ("NURSE".equals(user.getRole())) {
                actions = visitRepository.countByNurseId(user.getId());
            } else if ("DOCTOR".equals(user.getRole())) {
                actions = medicalRecordRepository.countByDoctorId(user.getId());
            }

            staffData.put("actionCount", actions);
            performance.add(staffData);
        }

        return ResponseEntity.ok(performance);
    }
}
