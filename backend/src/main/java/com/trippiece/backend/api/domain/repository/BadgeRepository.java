package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {
}