package com.trippiece.backend.api.domain.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@ApiModel("TripRequest")
public class TripRequestDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class TripRegister {
        @ApiModelProperty(name = "지역", example = "1")
        long regionId;

        @ApiModelProperty(name = "티켓명", example = "두근두근서울여행")
        String title;

        @ApiModelProperty(name = "시작날짜", example = "2022-09-13")
        String startDate;

        @ApiModelProperty(name = "종료날짜", example = "2022-09-19")
        String endDate;
    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class TripEdit {
        @ApiModelProperty(name = "트립아이디", example = "1")
        long tripId;

        @ApiModelProperty(name = "지역", example = "1")
        long regionId;

        @ApiModelProperty(name = "티켓명", example = "두근두근서울여행")
        String title;

        @ApiModelProperty(name = "시작날짜", example = "2022-09-13")
        String startDate;

        @ApiModelProperty(name = "종료날짜", example = "2022-09-19")
        String endDate;
    }


}
