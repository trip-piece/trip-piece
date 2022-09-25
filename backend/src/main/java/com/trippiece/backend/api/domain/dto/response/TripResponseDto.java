package com.trippiece.backend.api.domain.dto.response;
import com.trippiece.backend.api.domain.entity.Trip;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class TripResponseDto {
    long regionId;
    long tripId;
    String title;
    LocalDate startDate;
    LocalDate endDate;

    public TripResponseDto(Trip trip){
        this.regionId = trip.getRegion().getId();
        this.tripId = trip.getId();
        this.title = trip.getTitle();
        this.startDate = trip.getStartDate();
        this.endDate = trip.getEndDate();

    }

}
