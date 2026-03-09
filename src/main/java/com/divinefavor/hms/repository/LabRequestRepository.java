package com.divinefavor.hms.repository;

import com.divinefavor.hms.model.LabRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LabRequestRepository extends JpaRepository<LabRequest, Long> {
    List<LabRequest> findByStatus(String status);
}
