package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
}
