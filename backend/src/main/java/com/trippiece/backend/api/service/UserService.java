package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.response.JwtTokenResponse;
import com.trippiece.backend.api.domain.entity.Auth;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.AuthRepository;
import com.trippiece.backend.api.domain.repository.UserRepository;
import com.trippiece.backend.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AuthRepository authRepository;
    private final JwtTokenUtil JWTTokenUtil;

    @Transactional
    public JwtTokenResponse login(final String walletAddress){
        boolean isFirstLogin = false;
        if (!userRepository.existsByWalletAddress(walletAddress)) {
            register(walletAddress);
            isFirstLogin = true;
        }

        // 없으면 만들어오기 때문에 못 찾을 수 없음. 바로 get()
        User user = userRepository.findByWalletAddress(walletAddress).get();
        Optional<Auth> authOptional = authRepository.findByUser(user);
        String accessToken = "";
        String refreshToken = "";

        Auth auth;

        if (authOptional.isPresent()) {
            auth = authOptional.get();
            if (!JWTTokenUtil.isValidRefreshToken(refreshToken)) auth.update(JWTTokenUtil.saveRefreshToken(user));
            accessToken = JWTTokenUtil.generateJwtToken(auth.getUser());
            refreshToken = auth.getRefreshToken();
        }
        else {
            accessToken = JWTTokenUtil.generateJwtToken(user);
            refreshToken = JWTTokenUtil.saveRefreshToken(user);
            auth = Auth.builder().
                    user(user).
                    refreshToken(refreshToken).
                    build();
            authRepository.save(auth);
        }

        long expiresIn = JWTTokenUtil.getExpFromToken(accessToken);

        return JwtTokenResponse
                .builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpiresIn(expiresIn)
                .isFirstLogin(isFirstLogin)
                .build();
    }
    @Transactional
    public User register(final String walletAddress){

        User user = User.builder()
                .walletAddress(walletAddress)
                .nickname("undefined")
                .firstBadge(0)
                .secondBadge(0)
                .thirdBadge(0)
                .build();

        userRepository.save(user);
        return user;
    }
}
