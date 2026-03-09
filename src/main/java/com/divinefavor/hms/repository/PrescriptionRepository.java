package com.divinefavor.hms.repository;

import com.divinefavor.hms.model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByDispensed(boolean dispensed);
}
