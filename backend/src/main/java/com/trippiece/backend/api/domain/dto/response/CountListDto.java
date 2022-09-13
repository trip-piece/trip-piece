package com.trippiece.backend.api.domain.dto.response;

import lombok.Getter;

@Getter
public class CountListDto {
    long regionId;
    int frameCnt;

    public CountListDto(long regionId, int frameCnt){
        this.regionId=regionId;
        this.frameCnt=frameCnt;
    }
}
