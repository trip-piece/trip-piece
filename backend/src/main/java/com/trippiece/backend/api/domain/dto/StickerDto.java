package com.trippiece.backend.api.domain.dto;

import com.trippiece.backend.api.domain.entity.Sticker;
import lombok.Getter;

@Getter
public class StickerDto implements Comparable<StickerDto> {
    private long id;
    private long tokenId;
    private String tokenName;
    private String tokenURL;

    public StickerDto(Sticker sticker) {
        this.id = sticker.getId();
        this.tokenId = sticker.getTokenId();
        this.tokenName = sticker.getTokenName();
        this.tokenURL = sticker.getTokenURL();
    }

    @Override
    public int compareTo(StickerDto o) {
        return (int) (this.id-o.getId());
    }
}
