package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Long> {
}
