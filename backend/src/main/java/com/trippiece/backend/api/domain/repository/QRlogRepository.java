package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Place;
import com.trippiece.backend.api.domain.entity.QRlog;
import com.trippiece.backend.api.domain.entity.Sticker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QRlogRepository extends JpaRepository<QRlog, Long> {
    int countAllByTokenNameAndPlace(String tokenName, Place place);

    boolean existsBySticker(Sticker sticker);
}
