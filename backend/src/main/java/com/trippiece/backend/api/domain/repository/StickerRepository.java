package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Place;
import com.trippiece.backend.api.domain.entity.Sticker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StickerRepository extends JpaRepository<Sticker, Long> {
    List<Sticker> findAllByPlace(Place place);
    @Query(value = "SELECT DISTINCT token_name FROM sticker where place_id = :placeId", nativeQuery = true)
    List<String> getTokenNameList(@Param("placeId") long placeId);
    Sticker findDistinctByTokenNameAndPlace(String tokenName, Place place);
    Sticker findByTokenId(long TokenId);
    int countAllByTokenNameAndPlace(String tokenName, Place place);
}
