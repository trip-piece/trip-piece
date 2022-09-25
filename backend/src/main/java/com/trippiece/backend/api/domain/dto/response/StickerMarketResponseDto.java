package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Market;
import lombok.Getter;

@Getter
public class StickerMarketResponseDto {
    private long marketId;
    private long stickerId;
    private long tokenId;
    private String tokenName;
    private String tokenURL;
    private long userId;
    private float price;

    public StickerMarketResponseDto(Market market) {
        this.marketId = market.getId();
        this.stickerId = market.getSticker().getId();
        this.tokenId = market.getSticker().getTokenId();
        this.tokenName = market.getSticker().getTokenName();
        this.tokenURL = market.getSticker().getTokenURL();
        this.userId = market.getUser().getId();
        this.price = market.getPrice();
    }

}
