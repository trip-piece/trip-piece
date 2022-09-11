package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Frame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FrameRepository extends JpaRepository<Frame, Long> {
}
