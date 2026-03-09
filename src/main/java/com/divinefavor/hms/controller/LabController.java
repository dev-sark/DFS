package com.divinefavor.hms.controller;

import com.divinefavor.hms.model.LabRequest;
import com.divinefavor.hms.service.LabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab")
@PreAuthorize("hasAnyRole('LAB_TECH', 'ADMIN')")
public class LabController {

    @Autowired
    private LabService labService;

    @GetMapping("/pending")
    public ResponseEntity<List<LabRequest>> getPendingRequests() {
        return ResponseEntity.ok(labService.getPendingRequests());
    }

    @PostMapping("/submit-result/{requestId}")
    public ResponseEntity<LabRequest> submitResult(
            @PathVariable Long requestId,
            @RequestParam String results,
            @RequestParam String techName) {
        return ResponseEntity.ok(labService.submitResult(requestId, results, techName));
    }
}
