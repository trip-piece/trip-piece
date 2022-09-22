package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Market;
import lombok.Getter;

@Getter
public class MarketStickerResponseDto {
    long marketId;
    long tokenId;

    long stickerId;

    String tokenName;

    String tokenURL;
    long userId;
    float price;

    public MarketStickerResponseDto(Market market){
        this.marketId = market.getId();
        this.tokenId =market.getSticker().getTokenId();
        this.stickerId = market.getSticker().getId();
        this.tokenName = market.getSticker().getTokenName();
        this.tokenURL = market.getSticker().getTokenURL();
        this.userId =market.getUser().getId();
        this. price = market.getPrice();
    }
}
