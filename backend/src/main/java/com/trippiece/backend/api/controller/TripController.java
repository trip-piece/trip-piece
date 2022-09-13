package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.request.TripRequestDto;
import com.trippiece.backend.api.domain.dto.response.StickerFrameResponseDto;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.service.TripService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Api(value = "여행티켓 관련 API", tags = {"Trip"})
@RestController
@CrossOrigin("*")
@RequestMapping("/trip")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @PostMapping
    @ApiOperation(value = "여행티켓 추가", notes = "새로운 여행티켓을 추가한다.")
    public ResponseEntity<?> addTrip(@RequestBody TripRequestDto tripRequestDto) {
        //지원센세거 가져왔음
        //로그인 완료되면 token으로 User 가져올 예정
        User user = null;
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            tripService.addTrip(tripRequestDto);
            return new ResponseEntity<String>("티켓 추가 성공!", HttpStatus.CREATED);
        }


    }
}
