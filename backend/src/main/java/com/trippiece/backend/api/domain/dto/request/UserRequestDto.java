package com.trippiece.backend.api.domain.dto.request;

import lombok.Getter;


public class UserRequestDto {
    @Getter
    public static class LogIn {
        private String walletAddress;
    }

    @Getter
    public static class Nickname {
        private String nickname;
    }

    @Getter
    public static class RepBadge {
        private long firstBadge;
        private long secondBadge;
        private long thirdBadge;
    }

}
