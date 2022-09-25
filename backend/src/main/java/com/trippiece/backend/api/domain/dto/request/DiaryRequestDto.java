package com.trippiece.backend.api.domain.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

        @ApiModelProperty(name = "배경색", example = "1")
        int backgroundColor;

        @ApiModelProperty(name = "날씨", example = "1")
        int weather;

        @ApiModelProperty(name = "오늘의포토", example = "임상빈.png")
        String todayPhoto;

    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class DiaryEdit {
        @ApiModelProperty(name = "일기아이디", example = "1")
        long diaryId;

        @ApiModelProperty(name = "일기내용", example = "날이 좋아서.. 날이 좋지 않아서..")
        String content;

        @ApiModelProperty(name = "오늘의포토", example = "임상빈.png")
        String todayPhoto;

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
    }


}
