package com.trippiece.backend.api.domain.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class JwtTokenResponse {
    private String accessToken;
    private String refreshToken;
    private long accessTokenExpiresIn;
    private boolean isFirstLogin;

    @Builder
    JwtTokenResponse(String accessToken, String refreshToken, long accessTokenExpiresIn, boolean isFirstLogin){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.accessTokenExpiresIn = accessTokenExpiresIn;
        this.isFirstLogin = isFirstLogin;
    }
}
