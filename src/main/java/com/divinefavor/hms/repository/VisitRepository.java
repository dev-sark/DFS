package com.divinefavor.hms.repository;

import com.divinefavor.hms.model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findByPatientId(Long patientId);
    List<Visit> findByStatus(String status);
    long countByNurseId(Long nurseId);
}
