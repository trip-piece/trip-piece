package com.trippiece.backend.api.domain.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class StickerFrameResponseDto {
    private List<StickerDecorationDto> stickerList;
    private boolean isScrapped;
    private float ratio;

    public StickerFrameResponseDto(List<StickerDecorationDto> stickerList, boolean isScrapped, float ratio) {
        this.stickerList=stickerList;
        this.isScrapped=isScrapped;
        this.ratio=ratio;
    }
}
