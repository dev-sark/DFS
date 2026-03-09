package com.divinefavor.hms.service;

import com.divinefavor.hms.model.LabRequest;
import com.divinefavor.hms.model.Visit;
import com.divinefavor.hms.model.VisitStatus;
import com.divinefavor.hms.repository.LabRequestRepository;
import com.divinefavor.hms.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LabService {

    @Autowired
    private LabRequestRepository labRequestRepository;

    @Autowired
    private VisitRepository visitRepository;

    public List<LabRequest> getPendingRequests() {
        return labRequestRepository.findByStatus("PENDING");
    }

    @Transactional
    public LabRequest submitResult(Long requestId, String results, String techName) {
        LabRequest request = labRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Lab request not found"));

        request.setResults(results);
        request.setResultDate(LocalDateTime.now());
        request.setStatus("COMPLETED");
        request.setPerformedBy(techName);

        // Check if all lab requests for this visit are completed
        Visit visit = request.getVisit();
        visit.setStatus(VisitStatus.LAB_COMPLETED);
        visitRepository.save(visit);

        return labRequestRepository.save(request);
    }
}
