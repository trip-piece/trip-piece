package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Diary;
import com.trippiece.backend.api.domain.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Diary findByTripAndAndCreateDate(Trip trip, LocalDate date);

}
