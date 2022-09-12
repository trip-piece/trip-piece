package com.trippiece.backend.api.domain.dto.response;

public class StickerDto {
    int tokenId;
    float x;
    float y;
    
    public StickerDto(int tokenId, float x, float y){
        this.tokenId=tokenId;
        this.x=x;
        this.y=y;
    }
}
