package com.divinefavor.hms.repository;

import com.divinefavor.hms.model.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    Optional<MedicalRecord> findByVisitId(Long visitId);
    long countByDoctorId(Long doctorId);
}
