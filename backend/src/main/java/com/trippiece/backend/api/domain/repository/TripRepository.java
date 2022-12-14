package com.trippiece.backend.api.domain.repository;
import com.trippiece.backend.api.domain.entity.Trip;
import com.trippiece.backend.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findAllByUserOrderByStartDate(User user);
    List<Trip> findFirstByStartDateAfterAndUserOrderByStartDate(LocalDate todayDate, User user);
}
