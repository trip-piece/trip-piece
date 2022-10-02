package com.trippiece.backend.api.domain.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@ApiModel("DiaryRequest")
public class DiaryRequestDto {
    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)

    public static class DiaryRegister{
        @ApiModelProperty(name = "티켓아이디", example = "1")
        long tripId;

        @ApiModelProperty(name = "일기내용", example = "날이 좋아서.. 날이 좋지 않아서..")
        String content;

        @ApiModelProperty(name = "폰트타입", example = "1")
        int fontType;

        @ApiModelProperty(name = "내가 작성하려는 일기 날짜 ", example = "2022-09-19")
        private String diaryDate;

        @ApiModelProperty(name = "최초 작성한 위치", example = "서울특별시 강남구 어쩌구동")
        private String location;

        @ApiModelProperty(name = "배경색", example = "1")
        int backgroundColor;

        @ApiModelProperty(name = "날씨", example = "1")
        int weather;

        @ApiModelProperty(name = "오늘의포토", example = "임상빈.png")
        String todayPhoto;

        @ApiModelProperty(name = "화면 비율", example = "69.69")
        float ratio;

    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class DiaryEdit {
        @ApiModelProperty(name = "일기아이디", example = "1")
        long diaryId;

        @ApiModelProperty(name = "일기내용", example = "날이 좋아서.. 날이 좋지 않아서..")
        String content;

        @ApiModelProperty(name = "기존의 오늘의 포토 url", example = "임상빈.png")
        String imagePath;

        @ApiModelProperty(name = "폰트타입", example = "1")
        int fontType;

        @ApiModelProperty(name = "배경색", example = "1")
        int backgroundColor;

        @ApiModelProperty(name = "날씨", example = "1")
        int weather;

        @ApiModelProperty(name = "유저아이디", example = "1")
        long userId;

        @ApiModelProperty(name = "티켓아이디", example = "1")
        long tripId;

        @ApiModelProperty(name = "화면 비율", example = "69.69")
        float ratio;
    }


}
