package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.request.TripRequestDto;
import com.trippiece.backend.api.domain.entity.Region;
import com.trippiece.backend.api.domain.entity.Trip;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.RegionRepository;
import com.trippiece.backend.api.domain.repository.TripRepository;
import com.trippiece.backend.api.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository tripRepository;
    private final RegionRepository regionRepository;
    private final UserRepository userRepository;

    @Transactional
    public void addTrip(TripRequestDto tripRequestDto) {
        Region region = regionRepository.getOne(tripRequestDto.getRegionId());
        User user = userRepository.getOne(tripRequestDto.getUserId());
        Trip trip = Trip.builder()
                .region(region)
                .user(user)
                .title(tripRequestDto.getTitle())
                .startDate(tripRequestDto.getStartDate())
                .endDate(tripRequestDto.getEndDate())
                .build();
        tripRepository.save(trip);
    }
}
