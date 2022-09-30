package com.trippiece.backend.api.domain.dto.request;

import lombok.Getter;

public class MarketRequestDto {

    @Getter
    public static class Register {
        private long tokenId;
        private float price;
    }

    @Getter
    public static class Delete{
        private long marketId;
    }
}
