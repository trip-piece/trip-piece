package com.trippiece.backend.api.domain.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class StickerFrameResponseDto {
    private List<StickerDecorationDto> stickerList;
    private boolean isScrapped;

    public StickerFrameResponseDto(List<StickerDecorationDto> stickerList, boolean isScrapped) {
        this.stickerList=stickerList;
        this.isScrapped=isScrapped;
    }
}
