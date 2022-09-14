package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.request.UserRequestDto;
import com.trippiece.backend.api.domain.dto.response.*;
import com.trippiece.backend.api.domain.entity.*;
import com.trippiece.backend.api.domain.repository.*;
import com.trippiece.backend.exception.CustomException;
import com.trippiece.backend.exception.ErrorCode;
import com.trippiece.backend.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AuthRepository authRepository;
    private final BadgeRepository badgeRepository;
    private final TripRepository tripRepository;
    private final DiaryRepository diaryRepository;
    private final ScrapRepository scrapRepository;

    private final FrameRepository frameRepository;

    private final MyBadgeRepository myBadgeRepository;
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
    @Transactional(readOnly = true)
    public UserResponseDto.Detail findUser(final long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) throw new CustomException(ErrorCode.USER_NOT_FOUND);

        User user = userOptional.get();
        List<Badge> repBadgeList = findRepBadgeList(user);
        long tripCount = tripRepository.findAllByUser(user).size();
        long diaryCount = diaryRepository.findAllByUser(user).size();

        UserResponseDto.Detail userDetail = UserResponseDto.Detail.builder()
                .userId(user.getId())
                .walletAddress(user.getWalletAddress())
                .nickname(user.getNickname())
                .repBadgeList(repBadgeList)
                .tripCount(tripCount)
                .diaryCount(diaryCount)
                .build();

        return userDetail;
    }
    @Transactional
    public HttpStatus modifyNickname(final long userId, final String nickname){
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) throw new CustomException(ErrorCode.USER_NOT_FOUND);

        User user = userOptional.get();
        user.update(nickname, user.getFirstBadge(), user.getSecondBadge(), user.getThirdBadge());

        return HttpStatus.OK;
    }

    @Transactional
    public HttpStatus modifyRepBadges(final long userId, final UserRequestDto.RepBadge badges){
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) throw new CustomException(ErrorCode.USER_NOT_FOUND);

        User user = userOptional.get();
        user.update(user.getNickname(), badges.getFirstBadge(), badges.getSecondBadge(), badges.getThirdBadge());

        return HttpStatus.OK;
    }

    @Transactional(readOnly = true)
    public UserResponseDto.Badges findBadgeList(final long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) throw new CustomException(ErrorCode.USER_NOT_FOUND);

        User user = userOptional.get();
        List<BadgeResponseDto.Detail> badgeList = new ArrayList<>();
        List<MyBadge> myBadgeList = myBadgeRepository.findAllByUser(user);

        for (MyBadge item : myBadgeList) {
            badgeList.add(BadgeResponseDto.Detail.builder()
                    .badgeId(item.getBadge().getId())
                    .name(item.getBadge().getName())
                    .description(item.getBadge().getDescription())
                    .image(item.getBadge().getBadgeImage())
                    .build());
        }

        UserResponseDto.Badges badgesResponse = UserResponseDto.Badges.builder().badgeList(badgeList).build();
        return badgesResponse;
    }

    @Transactional(readOnly = true)
    public Page<ScrapResponseDto.Outline> findScrapedFrameList(final long userId, Pageable pageable){
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) throw new CustomException(ErrorCode.USER_NOT_FOUND);

        User user = userOptional.get();
        List<Scrap> scrapList = scrapRepository.findByUser(user);
        List<ScrapResponseDto.Outline> outlineList = new ArrayList<>();

        for (Scrap item : scrapList){
            outlineList.add(ScrapResponseDto.Outline.builder()
                    .scrapId(item.getId())
                    .diaryId(item.getFrame().getDiary().getId())
                    .image(item.getFrame().getFrameImage())
                    .build());
        }
        int size = outlineList.size();
        int start = (int) pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), size);
        Page<ScrapResponseDto.Outline> scrapedFramesResponse = new PageImpl<>(outlineList.subList(start, end), pageable, size);
        return scrapedFramesResponse;
    }

    public List<Badge> findRepBadgeList(User user){
        List<Badge> repBadgeList = new ArrayList<>();

        if (user.getFirstBadge() == 0) repBadgeList.add(Badge.builder().name("null").badgeImage("null").description("null").build());
        else repBadgeList.add(badgeRepository.findById(user.getFirstBadge()).get());
        if (user.getSecondBadge() == 0) repBadgeList.add(Badge.builder().name("null").badgeImage("null").description("null").build());
        else repBadgeList.add(badgeRepository.findById(user.getSecondBadge()).get());
        if (user.getThirdBadge() == 0) repBadgeList.add(Badge.builder().name("null").badgeImage("null").description("null").build());
        else repBadgeList.add(badgeRepository.findById(user.getThirdBadge()).get());

        return repBadgeList;
    }

    public User findOneUser(long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
    }
}
