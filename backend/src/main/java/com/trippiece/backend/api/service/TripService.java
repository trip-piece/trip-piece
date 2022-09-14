package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.request.TripRequestDto;
import com.trippiece.backend.api.domain.dto.response.TripResponseDto;
import com.trippiece.backend.api.domain.entity.Region;
import com.trippiece.backend.api.domain.entity.Trip;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.RegionRepository;
import com.trippiece.backend.api.domain.repository.TripRepository;
import com.trippiece.backend.api.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Transactional
    public void deleteTrip(final long tripId) {
        Trip ticket = tripRepository.getOne(tripId);
        tripRepository.delete(ticket);
    }

    @Transactional
    public void updateTrip(final long tripId, TripRequestDto tripRequestDto) {
        Trip trip = tripRepository.getOne(tripId);
        Region region = regionRepository.getOne(tripRequestDto.getRegionId());
        User user = userRepository.getOne(tripRequestDto.getUserId());

        trip.update(tripRequestDto.getTitle(), tripRequestDto.getStartDate(), tripRequestDto.getEndDate(), user, region);
    }

    @Transactional
    public Page<TripResponseDto> findTripList(final User user, final Pageable pageable) {
        List<Trip> list = new ArrayList<>();

        list.addAll(tripRepository.findAllByUser(user));

        List<TripResponseDto> responseList = new ArrayList<>();
        for (Trip trip : list) {
            responseList.add(new TripResponseDto(trip));
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), responseList.size());
        Page<TripResponseDto> result = new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());
        return result;


    }

    @Transactional
    public TripResponseDto findTrip(final User user,final long tripId){
        Trip trip = tripRepository.getOne(tripId);
        return new TripResponseDto(trip);

    }
    @Transactional
    public TripResponseDto isInTrip(final User user, LocalDate todayDate){
        long result = 1000000;
        Trip tt =null;
        List<Trip> list = new ArrayList<>();
        list.addAll(tripRepository.findAllByUser(user));
        for(Trip t : list){
            if(todayDate.isAfter(t.getEndDate()))continue;
            if(!todayDate.isBefore(t.getStartDate())&&todayDate.isBefore(t.getEndDate())){
                return new TripResponseDto(t); //진행중일때
            }
        }
        if(tripRepository.findFirstByStartDateAndUserOrderByStartDate(user,todayDate)==null){
            return null;
        }else{
            return new TripResponseDto(tripRepository.findFirstByStartDateAndUserOrderByStartDate(user,todayDate).get(0));
        }
    }
}
