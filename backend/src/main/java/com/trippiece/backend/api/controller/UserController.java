package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.request.UserRequestDto;
import com.trippiece.backend.api.domain.dto.response.JwtTokenResponse;
import com.trippiece.backend.api.domain.dto.response.UserResponseDto;
import com.trippiece.backend.api.service.UserService;
import com.trippiece.backend.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@Api(value = "유저 관련 API", tags={"User"})
@RestController
@CrossOrigin("*")
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    @ApiOperation(value = "로그인", notes = "로그인 시 수행 할 api, jwt token을 return")
    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody final UserRequestDto.LogIn logInRequest){
        System.out.println(logInRequest.getWalletAddress());
        if (logInRequest.getWalletAddress().length() != 42)
            return new ResponseEntity<String>("올바르지 않은 Wallet Address입니다.", HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<JwtTokenResponse>(userService.login(logInRequest.getWalletAddress()), HttpStatus.OK);
    }

    @ApiOperation(value = "내 정보", notes = "내 정보 조회")
    @GetMapping
    public ResponseEntity<?> myInfo(@RequestHeader("ACCESS_TOKEN") String accessToken){
        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        return new ResponseEntity<UserResponseDto.Detail>(userService.findUser(userId), HttpStatus.OK);
    }

    @ApiOperation(value = "닉네임 수정", notes = "수정 할 닉네임을 받아서 회원의 닉네임을 수정")
    @PatchMapping("/nickname")
    public ResponseEntity<?> changeNickname(@RequestHeader("ACCESS_TOKEN") String accessToken,
                                            @RequestBody UserRequestDto.Nickname nicknameRequest){
        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        return new ResponseEntity<String>("닉네임 수정 성공", userService.modifyNickname(userId, nicknameRequest.getNickname()));
    }

    @ApiOperation(value = "대표 뱃지 수정", notes = "수정 할 뱃지들의 id를 받아서 회원의 대표뱃지를 수정")
    @PatchMapping("/badges")
    public ResponseEntity<?> changeBadges(@RequestHeader("ACCESS_TOKEN") String accessToken,
                                            @RequestBody UserRequestDto.RepBadge repBadgeRequest){
        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        return new ResponseEntity<String>("뱃지 수정 성공", userService.modifyRepBadges(userId, repBadgeRequest));
    }

    @ApiOperation(value = "보유중인 뱃지 조회", notes = "요청한 유저가 가지고 있는 모든 뱃지 조회")
    @GetMapping("/badges")
    public ResponseEntity<?> myBadges(@RequestHeader("ACCESS_TOKEN") String accessToken){
        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        return new ResponseEntity<UserResponseDto.Badges>(userService.findBadgeList(userId), HttpStatus.OK);
    }
}
