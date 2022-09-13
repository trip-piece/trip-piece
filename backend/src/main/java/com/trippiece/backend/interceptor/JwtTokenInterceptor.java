package com.trippiece.backend.interceptor;

import com.trippiece.backend.api.domain.entity.Auth;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.AuthRepository;
import com.trippiece.backend.api.domain.repository.UserRepository;
import com.trippiece.backend.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtTokenInterceptor implements HandlerInterceptor {

    private final JwtTokenUtil jwtTokenUtil;
    private final AuthRepository authRepository;
    private final UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws IOException {

        System.out.println("JwtToken 호출");
        String accessToken = request.getHeader("ACCESS_TOKEN");
        System.out.println("AccessToken:" + accessToken);
        String refreshToken = request.getHeader("REFRESH_TOKEN");
        System.out.println("RefreshToken:" + refreshToken);
        Optional<User> user = userRepository.findById(jwtTokenUtil.getUserIdFromToken(accessToken));

        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }
        if (accessToken != null) {
            if (user.isPresent()) {
                Optional<Auth> auth = authRepository.findByUser(user.get());
                if (auth.isPresent()) {
                    if (jwtTokenUtil.isValidToken(accessToken) && auth.get().getRefreshToken().equals(refreshToken)) {
                        return true;
                    }
                }
            }
        }
        System.out.println("setStatus401");
        response.setStatus(401);
        response.setHeader("ACCESS_TOKEN", accessToken);
        response.setHeader("REFRESH_TOKEN", refreshToken);
        response.setHeader("msg", "Invalid Token Error");
        return false;
    }
}
