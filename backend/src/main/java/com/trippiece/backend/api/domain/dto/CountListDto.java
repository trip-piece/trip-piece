package com.trippiece.backend.api.domain.dto;

import lombok.Getter;

@Getter
public class CountListDto {
    private long regionId;
    private int frameCnt;

    public CountListDto(long regionId, int frameCnt){
        this.regionId=regionId;
        this.frameCnt=frameCnt;
    }
}
