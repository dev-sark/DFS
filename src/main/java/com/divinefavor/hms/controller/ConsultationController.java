package com.divinefavor.hms.controller;

import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.model.VisitStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctor")
@PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
public class ConsultationController {

    @Autowired
    private com.divinefavor.hms.repository.VisitRepository visitRepository;

    @Autowired
    private com.divinefavor.hms.service.ConsultationService consultationService;

    @GetMapping("/queue")
    public ResponseEntity<List<Visit>> getConsultationQueue() {
        List<Visit> queue = visitRepository.findByStatus(VisitStatus.WAITING_FOR_CONSULTATION);

        // Sort by urgency first, then by visit date (oldest first)
        List<Visit> sortedQueue = queue.stream()
                .sorted(Comparator.comparing(Visit::isUrgent).reversed()
                        .thenComparing(Visit::getVisitDate))
                .collect(Collectors.toList());

        return ResponseEntity.ok(sortedQueue);
    }

    @PostMapping("/submit")
    public ResponseEntity<Visit> submitConsultation(@RequestBody ConsultationRequest request) {
        return ResponseEntity.ok(consultationService.saveExamination(
                request.getVisitId(),
                request.getPrimaryDiagnosis(),
                request.getLabRequests(),
                request.getPrescriptions()));
    }
}

class ConsultationRequest {
    private Long visitId;
    private String primaryDiagnosis;
    private List<com.divinefavor.hms.model.LabRequest> labRequests;
    private List<com.divinefavor.hms.model.Prescription> prescriptions;

    public Long getVisitId() {
        return visitId;
    }

    public void setVisitId(Long visitId) {
        this.visitId = visitId;
    }

    public String getPrimaryDiagnosis() {
        return primaryDiagnosis;
    }

    public void setPrimaryDiagnosis(String primaryDiagnosis) {
        this.primaryDiagnosis = primaryDiagnosis;
    }

    public List<com.divinefavor.hms.model.LabRequest> getLabRequests() {
        return labRequests;
    }

    public void setLabRequests(List<com.divinefavor.hms.model.LabRequest> labRequests) {
        this.labRequests = labRequests;
    }

    public List<com.divinefavor.hms.model.Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<com.divinefavor.hms.model.Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }
}
