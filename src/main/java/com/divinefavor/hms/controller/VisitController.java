package com.divinefavor.hms.controller;

import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visits")
@CrossOrigin(origins = "*", maxAge = 3600)
public class VisitController {

    @Autowired
    private VisitService visitService;

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<Visit>> getVisitHistory(@PathVariable Long id) {
        return ResponseEntity.ok(visitService.getVisitsByPatientId(id));
    }

    @PostMapping("/patient/{id}")
    public ResponseEntity<Visit> saveVitals(@PathVariable Long id, @RequestBody Visit visit) {
        String username = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(visitService.saveVitals(id, visit, username));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Visit>> getVisitsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(visitService.getVisitsByStatus(status));
    }
}
