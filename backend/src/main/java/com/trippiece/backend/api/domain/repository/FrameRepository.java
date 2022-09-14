package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Frame;
import com.trippiece.backend.api.domain.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FrameRepository extends JpaRepository<Frame, Long> {
    List<Frame> findAllByRegionOrderByIdDesc(Region region);
}
