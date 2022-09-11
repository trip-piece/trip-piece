package com.trippiece.backend.api.domain.repository;
import com.trippiece.backend.api.domain.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip, Long> {
}
