package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarketRepository extends JpaRepository<Market, Long> {

    List<Market> findAllByUserOrderByIdDesc(User user);
}
