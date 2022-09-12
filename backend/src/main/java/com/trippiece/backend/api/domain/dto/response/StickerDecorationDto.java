package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Decoration;

public class StickerDecorationDto {
    int tokenId;
    float x;
    float y;

    public StickerDecorationDto(Decoration decoration){
        this.tokenId=decoration.getSticker().getTokenId();
        this.x=decoration.getX();
        this.y=decoration.getY();
    }
}
