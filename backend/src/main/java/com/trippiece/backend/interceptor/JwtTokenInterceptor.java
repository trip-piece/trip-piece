package com.trippiece.backend.interceptor;

import com.trippiece.backend.api.domain.entity.Auth;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.AuthRepository;
import com.trippiece.backend.api.domain.repository.UserRepository;
import com.trippiece.backend.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;
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

        String accessToken = request.getHeader("ACCESS_TOKEN");
        String refreshToken = request.getHeader("REFRESH_TOKEN");

        if (isPreflightRequest(request)) {
            return true;
        }


        if (accessToken != null) {
            if (jwtTokenUtil.isValidToken(accessToken)) {
                Optional<User> user = userRepository.findById(jwtTokenUtil.getUserIdFromToken(accessToken));
                if (user.isPresent()) {
                    Optional<Auth> auth = authRepository.findByUser(user.get());
                    if (auth.isPresent()) {
                        return true;
                    }
                }
            }
        }
        if (refreshToken != null) {
            if (jwtTokenUtil.isValidToken(refreshToken)) {
                Optional<User> user = userRepository.findById(jwtTokenUtil.getUserIdFromToken(accessToken));
                if (user.isPresent()) {
                    Optional<Auth> auth = authRepository.findByUser(user.get());
                    if (auth.isPresent()) {
                        return true;
                    }
                }
            }
        }

        response.setStatus(401);
        response.setHeader("ACCESS_TOKEN", accessToken);
        response.setHeader("REFRESH_TOKEN", refreshToken);
        response.setHeader("msg", "Invalid Token Error");
        return false;
    }

    private boolean isPreflightRequest(HttpServletRequest request) {
        return isOptions(request) && hasHeaders(request) && hasMethod(request) && hasOrigin(request);
    }

    private boolean isOptions(HttpServletRequest request) {
        return request.getMethod().equalsIgnoreCase(HttpMethod.OPTIONS.toString());
    }

    private boolean hasHeaders(HttpServletRequest request) {
        return Objects.nonNull(request.getHeader("Access-Control-Request-Headers"));
    }

    private boolean hasMethod(HttpServletRequest request) {
        return Objects.nonNull(request.getHeader("Access-Control-Request-Method"));
    }

    private boolean hasOrigin(HttpServletRequest request) {
        return Objects.nonNull(request.getHeader("Origin"));
    }
}