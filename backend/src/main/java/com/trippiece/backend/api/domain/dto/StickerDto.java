package com.trippiece.backend.api.domain.dto;

import com.trippiece.backend.api.domain.entity.Sticker;
import lombok.Getter;

@Getter
public class StickerDto {
    private long id;
    private int tokenId;

    public StickerDto(Sticker sticker) {
        this.id = sticker.getId();
        this.tokenId = sticker.getTokenId();
    }
}
