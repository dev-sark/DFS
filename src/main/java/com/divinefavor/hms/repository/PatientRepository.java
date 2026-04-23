package com.divinefavor.hms.repository;

import com.divinefavor.hms.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByFolderNumber(String folderNumber);

    boolean existsByFolderNumber(String folderNumber);
}