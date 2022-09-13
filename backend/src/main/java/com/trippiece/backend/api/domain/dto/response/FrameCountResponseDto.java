package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Frame;
import lombok.Getter;

import java.util.List;

@Getter
public class FrameCountResponseDto {
    List<CountListDto> countList;
    int countAll;

    public FrameCountResponseDto(List<CountListDto> countList, int countAll){
        this.countList=countList;
        this.countAll=countAll;
    }
}
