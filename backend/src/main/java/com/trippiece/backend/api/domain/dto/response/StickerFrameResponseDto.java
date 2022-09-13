package com.trippiece.backend.api.domain.dto.response;

import java.util.List;

public class StickerFrameResponseDto {
    List<StickerDecorationDto> stickerList;
    boolean isScrapped;

    public StickerFrameResponseDto(List<StickerDecorationDto> stickerList, boolean isScrapped) {
        this.stickerList=stickerList;
        this.isScrapped=isScrapped;
    }
}
