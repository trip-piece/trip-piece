package com.trippiece.backend.api.controller;
import com.trippiece.backend.api.domain.dto.request.TripRequestDto;
import com.trippiece.backend.api.domain.dto.response.TripResponseDto;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.service.TripService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @PostMapping
    @ApiOperation(value = "여행티켓 추가", notes = "가고자 하는 여행지와 일정을 추가한다.")
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

    @DeleteMapping
    @ApiOperation(value="여행 티켓 삭제",notes = "등록해 놓은 여행 일정을 삭제한다.")
    public ResponseEntity<?> deleteTrip(@PathVariable long tripId){
        //로그인이 확인되느냐
        //삭제하러가세용
        tripService.deleteTrip(tripId);
        return new ResponseEntity<String>("티켓 삭제 성공!", HttpStatus.NO_CONTENT);
    }

    @PatchMapping
    @ApiOperation(value="여행 티켓 수정", notes="등록한 여행 일정을 수정한다.")
    public ResponseEntity<?> updateTrip(@PathVariable("tripId") long tripId, @RequestBody TripRequestDto tripRequestDto){
        //로그인을 했는가
        //이 트립아이디의 주인이 요청하는 사람과 같은 사람인가?
        //수정해주세용
        tripService.updateTrip(tripId,tripRequestDto);
        return new ResponseEntity<String>("티켓 수정 성공!", HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value ="여행 티켓들 조회" ,notes ="사용자가 등록했던 모든 여행의 일정을 조회한다." )
    public ResponseEntity<?> getTripList(Pageable pageable){
        //로그인 완료되면 token으로 User 가져올 예정
        User user = null;
        if(user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else{
            return new ResponseEntity<Page<TripResponseDto>>(tripService.findTripList(user, pageable), HttpStatus.OK);
        }
    }
    @GetMapping("/{tripId}")
    @ApiOperation(value ="여행 티켓 한 개 조회" ,notes ="사용자가 등록했던 모든 여행의 일정 중 선택된 하나만 조회한다. " )
    public ResponseEntity<?> getTrip(@PathVariable("tripId") long tripId){
        //로그인 완료되면 token으로 User 가져올 예정
        User user = null;
        if(user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else{
            return new ResponseEntity<>(tripService.findTrip(user, tripId),HttpStatus.OK);
        }
    }

    @GetMapping("/{todayDate}")
    @ApiOperation(value ="진행중 및 예정된 여행티켓" ,notes ="홈 화면에 보여줄 현재 진행중인 여행. 현재 진행중인 여행이 없다면, 가장 가깝게 예정된 여행 반환 .예정된 여행마저 없다면 null" )
    public ResponseEntity<?> getInprogressTrip(@PathVariable("todayDate") LocalDate todayDate){
        User user =null;
        if(user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {


            return new ResponseEntity<>(tripService.isInTrip(user,todayDate),HttpStatus.OK);
        }
    }
}
