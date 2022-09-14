package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Market;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketRepository extends JpaRepository<Market, Long> {
}
