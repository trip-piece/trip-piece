package com.trippiece.backend.api.domain.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@ApiModel("TripRequest")
public class TripRequestDto {
    @ApiModelProperty(name = "지역", example = "1")
    long regionId;

    @ApiModelProperty(name = "유저", example = "1")
    long userId;

    @ApiModelProperty(name = "티켓명", example = "두근두근서울여행")
    String title;

    @ApiModelProperty(name = "시작날짜", example = "2022-09-13")
    LocalDate startDate;

    @ApiModelProperty(name = "종료날짜", example = "2022-09-19")
    LocalDate endDate;



}
