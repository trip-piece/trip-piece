package com.trippiece.backend.api.domain.repository;

import com.trippiece.backend.api.domain.entity.Place;
import com.trippiece.backend.api.domain.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findAllByTypeAndActivated(int type, boolean activated);
    List<Place> findAllByRegionAndTypeAndActivated(Region region, int type, boolean activated);
    List<Place> findAllByActivated(boolean activated);
    @Query(value = "SELECT *, (6371*acos(cos(radians(:userLat))*cos(radians(lat))*cos(radians(lng)" +
            "-radians(:userLng))+sin(radians(:userLat))*sin(radians(lat)))) AS distance " +
            "FROM place " +
            "Having distance <= 50 " +
            "ORDER BY distance", nativeQuery = true)
    List<Place> findAllByDistance(@Param("userLat") float lat, @Param("userLng") float lng);
}