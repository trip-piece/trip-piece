package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.request.TripRequestDto;
import com.trippiece.backend.api.domain.dto.response.TripResponseDto;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.service.TripService;
import com.trippiece.backend.api.service.UserService;
import com.trippiece.backend.util.DateConverter;
import com.trippiece.backend.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Api(value = "여행티켓 관련 API", tags = {"Trip"})
@RestController
@CrossOrigin("*")
@RequestMapping("/trip")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    private final DateConverter dateConverter;

    @PostMapping
    @ApiOperation(value = "여행 티켓추가", notes = "가고자 하는 여행지와 일정을 추가한다.")
    public ResponseEntity<?> addTrip(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody TripRequestDto tripRequestDto) {
        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.findOneUser(userId);
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                tripService.addTrip(user, tripRequestDto);
                return new ResponseEntity<String>("티켓 추가 성공!", HttpStatus.CREATED);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("여행 티켓 등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);

        }


    }

    @DeleteMapping
    @ApiOperation(value = "여행 티켓 삭제", notes = "등록해 놓은 여행 일정을 삭제한다.")
    public ResponseEntity<?> deleteTrip(@RequestHeader("ACCESS_TOKEN") final String accessToken, @PathVariable long tripId) {
        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.findOneUser(userId);
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                int deleteResult = tripService.deleteTrip(user, tripId);
                if (deleteResult == 406)
                    return new ResponseEntity<String>("사용자가 스티커 프레임의 소유자가 아닙니다.", HttpStatus.NOT_ACCEPTABLE);
                else return new ResponseEntity<String>("티켓 삭제 성공!", HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>("티켓 삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PatchMapping
    @ApiOperation(value = "여행 티켓 수정", notes = "등록한 여행 일정을 수정한다.")
    public ResponseEntity<?> updateTrip(@RequestHeader("ACCESS_TOKEN") final String accessToken, @PathVariable("tripId") long tripId, @RequestBody TripRequestDto tripRequestDto) {
        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.findOneUser(userId);
            int updateResult = tripService.updateTrip(user, tripId, tripRequestDto);
            if (updateResult == 406)
                return new ResponseEntity<String>("사용자가 티켓의 소유자가 아닙니다.", HttpStatus.NOT_ACCEPTABLE);
            else {
                return new ResponseEntity<String>("티켓 수정 성공!", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("여행 티켓 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @GetMapping
    @ApiOperation(value = "여행 티켓들 조회", notes = "사용자가 등록했던 모든 여행의 일정을 조회한다.")
    public ResponseEntity<?> getTripList(@RequestHeader("ACCESS_TOKEN") final String accessToken, @PageableDefault(size = 10) Pageable pageable) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.findOneUser(userId);
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            return new ResponseEntity<Page<TripResponseDto>>(tripService.findTripList(user, pageable), HttpStatus.OK);
        }
    }

    @GetMapping("/{tripId}")
    @ApiOperation(value = "여행 티켓 한 개 조회", notes = "사용자가 등록했던 모든 여행의 일정 중 선택된 하나만 조회한다. ")
    public ResponseEntity<?> getTrip(@RequestHeader("ACCESS_TOKEN") final String accessToken, @PathVariable("tripId") long tripId) {
        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.findOneUser(userId);
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            return new ResponseEntity<>(tripService.findTrip(tripId), HttpStatus.OK);
        }
    }

    @GetMapping("/{todayDate}")
    @ApiOperation(value = "진행중 및 예정된 여행티켓", notes = "홈 화면에 보여줄 현재 진행중인 여행. 현재 진행중인 여행이 없다면, 가장 가깝게 예정된 여행 반환 .예정된 여행마저 없다면 null")
    public ResponseEntity<?> getInprogressTrip(@RequestHeader("ACCESS_TOKEN") final String accessToken, @PathVariable("todayDate") String date) {
        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.findOneUser(userId);
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            LocalDate todayDate = dateConverter.convert(date);

            return new ResponseEntity<>(tripService.isInTrip(user, todayDate), HttpStatus.OK);
        }
    }
}