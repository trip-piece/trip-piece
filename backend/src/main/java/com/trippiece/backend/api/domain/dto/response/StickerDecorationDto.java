package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Decoration;
import lombok.Getter;

@Getter
public class StickerDecorationDto implements Comparable<StickerDecorationDto> {

    private long id;

    private long stickerId;
    private long tokenId;
    private float x;
    private float y;

    public StickerDecorationDto(Decoration decoration) {
        this.id = decoration.getId();
        this.stickerId = decoration.getSticker().getId();
        this.tokenId = decoration.getSticker().getTokenId();
        this.x = decoration.getX();
        this.y = decoration.getY();
    }

    @Override
    public int compareTo(StickerDecorationDto o) {
        return (int) (this.id - o.getId());
    }
}
