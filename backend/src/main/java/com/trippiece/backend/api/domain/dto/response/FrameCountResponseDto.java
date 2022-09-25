package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.dto.CountListDto;
import lombok.Getter;

import java.util.List;

@Getter
public class FrameCountResponseDto {
    private List<CountListDto> countList;
    private int countAll;

    public FrameCountResponseDto(List<CountListDto> countList, int countAll){
        this.countList=countList;
        this.countAll=countAll;
    }
}
