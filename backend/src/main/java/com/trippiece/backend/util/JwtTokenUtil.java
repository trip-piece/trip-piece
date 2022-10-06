package com.trippiece.backend.util;

import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.UserRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class JwtTokenUtil {

    private final String SECRET_KEY = "BboBbJJuWapBboBbJJuWapBboBbJJuWapBboBbJJuWapBboBbJJuWapBboBbJJuWap";
    private final String REFRESH_KEY = "JJuWapslovePoopJJuWapslovePoopJJuWapslovePoopJJuWapslovePoopJJuWapslovePoop";
    private final String DATA_KEY = "userId";

    private final String EXP_KEY = "exp";

    private final UserRepository userRepository;

    //AccessToken 발급
    public String generateJwtToken(User user) {
        return Jwts.builder()
                .setSubject(user.getWalletAddress())
                .setHeader(createHeader())
                .setClaims(createClaims(user))
                .setExpiration(createExpireDate(1000 * 60 * 60 * 24)) // 토큰 만료시간 24hour
                .signWith(SignatureAlgorithm.HS256, createSigningKey(SECRET_KEY)) //HS256 , key로 sign
                .compact(); // 토큰 생성
    }

    //RefreshToken 발급
    public String saveRefreshToken(User user) {
        return Jwts.builder()
                .setSubject(user.getWalletAddress())
                .setHeader(createHeaderRefresh())
                .setClaims(createClaims(user))
                .setExpiration(createExpireDate(1000 * 60 * 60 * 24 * 7)) // 토큰 만료시간 7일
                .signWith(SignatureAlgorithm.HS256, createSigningKey(REFRESH_KEY))
                .compact();
    }

    public boolean isValidToken(String token) {

        try {
            Claims accessClaims = getClaimsFormToken(token);
            return true;
        } catch (ExpiredJwtException exception) {
            return false;
        } catch (JwtException exception) {
            return false;
        } catch (NullPointerException exception) {
            return false;
        }
    }

    public boolean isValidRefreshToken(String token) {
        try {
            Claims accessClaims = getClaimsToken(token);
            return true;
        } catch (ExpiredJwtException exception) {
            return false;
        } catch (JwtException exception) {
            return false;
        } catch (NullPointerException exception) {
            return false;
        }
    }


    private Date createExpireDate(long expireDate) {
        long curTime = System.currentTimeMillis();
        return new Date(curTime + expireDate);
    }

    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();

        header.put("typ", "ACCESS_TOKEN");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());

        return header;
    }

    private Map<String, Object> createHeaderRefresh() {
        Map<String, Object> header = new HashMap<>();

        header.put("typ", "REFRESH_TOKEN");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());

        return header;
    }

    private Map<String, Object> createClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(DATA_KEY, user.getId());
        return claims;
    }

    private Key createSigningKey(String key) {
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(key);
        return new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    private Claims getClaimsFormToken(String token) {
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .parseClaimsJws(token)
                .getBody();
    }

    private Claims getClaimsToken(String token) {
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(REFRESH_KEY))
                .parseClaimsJws(token)
                .getBody();
    }

    public long getUserIdFromToken(String token) {

        Claims claims = getClaimsFormToken(token);
        long userId = claims.get(DATA_KEY, Long.class);
        User user = userRepository
                .findById(userId).get();

        return user.getId();
    }

    public long getExpFromToken(String token) {

        Claims claims = getClaimsFormToken(token);
        int exp = claims.get(EXP_KEY, Integer.class);

        return exp;
    }
}