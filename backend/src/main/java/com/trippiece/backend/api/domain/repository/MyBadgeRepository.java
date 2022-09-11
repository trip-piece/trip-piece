package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.MyBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyBadgeRepository extends JpaRepository<MyBadge, Long> {
}