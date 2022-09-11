package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Decoration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DecorationRepository extends JpaRepository<Decoration, Long> {
}
