package com.divinefavor.hms.service;

import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.model.VisitStatus;
import com.divinefavor.hms.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TriageService {

    @Autowired
    private VisitRepository visitRepository;

    public List<Visit> getWaitingForVitalsQueue() {
        return visitRepository.findByStatus(VisitStatus.WAITING_FOR_VITALS);
    }

    @Transactional
    public Visit captureVitals(Long visitId, Double temp, String bp, Integer heartRate, Double weight, boolean urgent,
            String notes) {
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("Visit not found with id: " + visitId));

        visit.setTemperature(temp);
        visit.setBloodPressure(bp);
        visit.setHeartRate(heartRate);
        visit.setWeight(weight);
        visit.setUrgent(urgent);
        visit.setTriageNotes(notes);

        // Transition to Doctor's queue
        visit.setStatus(VisitStatus.WAITING_FOR_CONSULTATION);

        return visitRepository.save(visit);
    }
}
