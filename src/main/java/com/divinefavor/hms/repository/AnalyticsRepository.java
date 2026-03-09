package com.divinefavor.hms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.divinefavor.hms.model.Visit;

public interface AnalyticsRepository extends JpaRepository<Visit, Long> {

    @Query("SELECT CAST(v.visitDate AS date) as date, COUNT(v) as count FROM Visit v GROUP BY CAST(v.visitDate AS date) ORDER BY date")
    List<Object[]> getVisitVolumeOverTime();

    @Query("SELECT v.primaryDiagnosis, COUNT(v) as count FROM Visit v WHERE v.primaryDiagnosis IS NOT NULL GROUP BY v.primaryDiagnosis ORDER BY count DESC")
    List<Object[]> getDiseasePrevalence();

    @Query("SELECT v.patient.id, v.patient.fullName, v.patient.folderNumber, COUNT(v) as visitCount " +
            "FROM Visit v GROUP BY v.patient.id, v.patient.fullName, v.patient.folderNumber " +
            "HAVING COUNT(v) > :threshold ORDER BY visitCount DESC")
    List<Object[]> getFrequentVisitors(@Param("threshold") Long threshold);
}
