package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.QRlog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QRlogRepository extends JpaRepository<QRlog, Long> {
}
