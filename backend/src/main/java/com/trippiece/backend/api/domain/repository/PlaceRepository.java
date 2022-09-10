package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Integer> {
}
