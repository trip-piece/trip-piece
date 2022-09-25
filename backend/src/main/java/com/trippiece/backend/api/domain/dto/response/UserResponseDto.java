package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Badge;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class UserResponseDto {
    @Getter
    @NoArgsConstructor
    public static class Detail{

        private long userId;
        private String walletAddress;
        private String nickname;
        private List<Badge> repBadgeList;
        private long tripCount;
        private long diaryCount;

        @Builder
        Detail(long userId, String walletAddress, String nickname,
               List<Badge> repBadgeList, long tripCount, long diaryCount){
            this.userId = userId;
            this.walletAddress = walletAddress;
            this.nickname = nickname;
            this.repBadgeList = repBadgeList;
            this.tripCount = tripCount;
            this.diaryCount = diaryCount;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Badges{
        private List<BadgeResponseDto.Detail> badgeList;

        @Builder
        Badges(List<BadgeResponseDto.Detail> badgeList){

            this.badgeList = badgeList;
        }

    }

}
