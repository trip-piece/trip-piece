package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Decoration;
import lombok.Getter;

@Getter
public class StickerDecorationDto {
    private int tokenId;
    private float x;
    private float y;

    public StickerDecorationDto(Decoration decoration){
        this.tokenId=decoration.getSticker().getTokenId();
        this.x=decoration.getX();
        this.y=decoration.getY();
    }
}
