package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Badge;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class BadgeResponseDto {
    @Getter
    @NoArgsConstructor
    public static class Detail{
        private long badgeId;
        private String name;
        private String description;
        private String image;

        @Builder
        Detail(long badgeId, String name, String description, String image){
            this.badgeId = badgeId;
            this.name = name;
            this.description = description;
            this.image = image;
        }

    }
}
