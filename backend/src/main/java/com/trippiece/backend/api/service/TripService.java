package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.request.TripRequestDto;
import com.trippiece.backend.api.domain.dto.response.TripResponseDto;
import com.trippiece.backend.api.domain.entity.Region;
import com.trippiece.backend.api.domain.entity.Trip;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.RegionRepository;
import com.trippiece.backend.api.domain.repository.TripRepository;
import com.trippiece.backend.api.domain.repository.UserRepository;
import com.trippiece.backend.exception.CustomException;
import com.trippiece.backend.exception.ErrorCode;
import com.trippiece.backend.util.DateConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository tripRepository;
    private final RegionRepository regionRepository;

    private final DateConverter dateConverter;

    @Transactional
    public void addTrip(User user, TripRequestDto tripRequestDto) {
        Region region = regionRepository.findById(tripRequestDto.getRegionId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        LocalDate convertStartDate = dateConverter.convert(tripRequestDto.getStartDate());
        LocalDate convertEndDate = dateConverter.convert(tripRequestDto.getEndDate());
        Trip trip = Trip.builder()
                .region(region)
                .user(user)
                .title(tripRequestDto.getTitle())
                .startDate(convertStartDate)
                .endDate(convertEndDate)
                .build();
        tripRepository.save(trip);
    }

    @Transactional
    public int deleteTrip(User user, final long tripId) {
        int resultCode = 200;
        Trip ticket = tripRepository.findById(tripId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        if (!ticket.getUser().equals(user)) resultCode = 406;
        else {
            tripRepository.delete(ticket);
        }
        return resultCode;
    }

    @Transactional
    public int updateTrip(User user, final long tripId, TripRequestDto tripRequestDto) {
        int resultCode = 200;
        Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Region region = regionRepository.findById(tripRequestDto.getRegionId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        if (!trip.getUser().equals(user)) resultCode = 406;
        else {
            LocalDate convertStartDate = dateConverter.convert(tripRequestDto.getStartDate());
            LocalDate convertEndDate = dateConverter.convert(tripRequestDto.getEndDate());
            trip.update(tripRequestDto.getTitle(), convertStartDate, convertEndDate, user, region);
        }
        return resultCode;
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
    public TripResponseDto findTrip(final long tripId) {

        Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        return new TripResponseDto(trip);
    }

    @Transactional
    public TripResponseDto isInTrip(final User user, LocalDate todayDate) {
        List<Trip> list = new ArrayList<>();
        list.addAll(tripRepository.findAllByUser(user));
        for (Trip t : list) {
            if (todayDate.isAfter(t.getEndDate())) continue;
            if (!todayDate.isBefore(t.getStartDate()) && todayDate.isBefore(t.getEndDate())) {
                return new TripResponseDto(t); //진행중일때
            }
        }
        if (tripRepository.findFirstByStartDateAndUserOrderByStartDate(todayDate,user).size() == 0) { //뒤 내용 아예없을때
            return null;
        } else {
            return new TripResponseDto(tripRepository.findFirstByStartDateAndUserOrderByStartDate(todayDate,user).get(0));
        }
    }
}
