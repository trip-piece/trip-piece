package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.request.UserRequestDto;
import com.trippiece.backend.api.domain.dto.response.JwtTokenResponse;
import com.trippiece.backend.api.service.UserService;
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

    @ApiOperation(value = "로그인", notes = "로그인 시 수행 할 api, jwt token을 return")
    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody final UserRequestDto userRequestDto){
        if (userRequestDto.getWalletAddress().length() != 42)
            return new ResponseEntity<String>("올바르지 않은 Wallet Address입니다.", HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<JwtTokenResponse>(userService.login(userRequestDto.getWalletAddress()), HttpStatus.OK);
    }

    @ApiOperation(value = "로그인", notes = "로그인 시 수행 할 api, jwt token을 return")
    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody final UserRequestDto userRequestDto){
        if (userRequestDto.getWalletAddress().length() != 42)
            return new ResponseEntity<String>("올바르지 않은 Wallet Address입니다.", HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<JwtTokenResponse>(userService.login(userRequestDto.getWalletAddress()), HttpStatus.OK);
    }
}
