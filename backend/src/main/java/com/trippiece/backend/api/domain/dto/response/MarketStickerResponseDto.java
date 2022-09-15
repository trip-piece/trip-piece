package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Market;

public class MarketStickerResponseDto {
    long marketId;
    long tokenId;
    long userId;
    float price;

    public MarketStickerResponseDto(Market market){
        this.marketId = market.getId();
        this.tokenId =market.getSticker().getTokenId();
        this.userId =market.getUser().getId();
        this. price = market.getPrice();
    }
}
