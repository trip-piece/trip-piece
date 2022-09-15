package com.trippiece.backend.api.domain.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class JwtTokenResponseDto {

    @Getter
    @NoArgsConstructor
    public static class Detail{
        private String accessToken;
        private String refreshToken;
        private long accessTokenExpiresIn;
        private boolean isFirstLogin;

        @Builder
        Detail(String accessToken, String refreshToken, long accessTokenExpiresIn, boolean isFirstLogin){
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.accessTokenExpiresIn = accessTokenExpiresIn;
            this.isFirstLogin = isFirstLogin;
        }
    }

    @Getter
    @NoArgsConstructor
    public  static class Reissue{
        private String accessToken;
        private String refreshToken;
        private long accessTokenExpiresIn;

        @Builder
        Reissue(String accessToken, String refreshToken, long accessTokenExpiresIn){
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.accessTokenExpiresIn = accessTokenExpiresIn;
        }
    }
}
