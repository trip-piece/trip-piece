package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.entity.Market;
import com.trippiece.backend.api.domain.entity.Sticker;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.MarketRepository;
import com.trippiece.backend.api.domain.repository.StickerRepository;
import com.trippiece.backend.exception.CustomException;
import com.trippiece.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MarketService {
    private final MarketRepository marketRepository;
    private final StickerRepository stickerRepository;

    public void addMarketSticker(User user, long tokenId, int price) {
        Sticker sticker = stickerRepository.findByTokenId(tokenId);
        Market marketBuilder = Market.builder()
                .price(price)
                .sticker(sticker)
                .user(user)
                .build();
        Market market= marketRepository.save(marketBuilder);

    }

    public int deleteMarketSticker(final User user, final long marketId) {
        int resultCode = 200;
        Market market = marketRepository.findById(marketId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        if (!market.getUser().equals(user)) resultCode = 406;
        else {
            marketRepository.delete(market);

        }
        return resultCode;
    }
}
