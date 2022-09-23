package com.trippiece.backend.api.domain.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ScrapResponseDto {
    @Getter
    @NoArgsConstructor
    public static class Outline{

        private long scrapId;
        private long frameId;
        private long diaryId;
        private String image;

        @Builder
        Outline(long scrapId, long frameId, long diaryId, String image){
            this.scrapId = scrapId;
            this.frameId = frameId;
            this.diaryId = diaryId;
            this.image = image;
        }

    }
}
