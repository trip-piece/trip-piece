package com.trippiece.backend.api.domain.dto;

import com.trippiece.backend.api.domain.entity.Sticker;
import lombok.Getter;

@Getter
public class DistinctStickerDto implements Comparable<DistinctStickerDto> {
    private long id;
    private int tokenId;
    private String tokenName;
    private String tokenURL;
    private int amount;

    public DistinctStickerDto(Sticker sticker, int amount) {
        this.id = sticker.getId();
        this.tokenId = sticker.getTokenId();
        this.tokenName = sticker.getTokenName();
        this.tokenURL = sticker.getTokenURL();
        this.amount = amount;
    }

    @Override
    public int compareTo(DistinctStickerDto o) {
        return (int) (this.id-o.getId());
    }
}
