package com.divinefavor.hms.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.divinefavor.hms.service.AnalyticsService;

@RestController
@RequestMapping("/api/analytics")
@PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/visit-volume")
    public ResponseEntity<List<Map<String, Object>>> getVisitVolume() {
        return ResponseEntity.ok(analyticsService.getVisitVolume());
    }

    @GetMapping("/disease-prevalence")
    public ResponseEntity<List<Map<String, Object>>> getDiseaseStats() {
        return ResponseEntity.ok(analyticsService.getDiseaseStats());
    }

    @GetMapping("/frequent-visitors")
    public ResponseEntity<List<Map<String, Object>>> getFrequentVisitors(
            @RequestParam(defaultValue = "1") Long threshold) {
        return ResponseEntity.ok(analyticsService.getHighFrequencyPatients(threshold));
    }
}
