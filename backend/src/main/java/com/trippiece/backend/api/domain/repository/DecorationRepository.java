package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Decoration;
import com.trippiece.backend.api.domain.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DecorationRepository extends JpaRepository<Decoration, Long> {
    List<Decoration> findAllByDiary(Diary diary);

    @Override
    boolean existsById(Long aLong);
}
