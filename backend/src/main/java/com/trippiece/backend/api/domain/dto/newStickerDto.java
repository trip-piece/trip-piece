package com.trippiece.backend.api.domain.dto;

import com.trippiece.backend.api.domain.entity.Sticker;
import lombok.Getter;

@Getter
public class newStickerDto {
    private long tokenId;
    private String tokenName;
    private String tokenURL;

    public newStickerDto(Sticker sticker) {
        this.tokenId = sticker.getTokenId();
        this.tokenName = sticker.getTokenName();
        this.tokenURL = sticker.getTokenURL();
    }
}
