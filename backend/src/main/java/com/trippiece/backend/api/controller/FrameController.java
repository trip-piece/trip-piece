package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.response.FrameCountResponseDto;
import com.trippiece.backend.api.domain.dto.response.FrameResponseDto;
import com.trippiece.backend.api.domain.dto.response.StickerFrameResponseDto;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.service.FrameService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "스티커 프레임 공유 관련 API", tags={"Frame"})
@RestController
@CrossOrigin("*")
@RequestMapping("/frames")
@RequiredArgsConstructor
public class FrameController {

    private final FrameService frameService;

    @GetMapping
    @ApiOperation(value = "공유된 스티커프레임 리스트 조회", notes = "지역별 필터링을 포함하여 공유된 스티커 프레임의 리스트를 조회한다.")
    public ResponseEntity<?> getFrameList(@RequestParam List<Long> regionList, Pageable pageable) {
        //로그인 완료되면 token으로 User 가져올 예정
        User user = null;
        if(user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else{
            return new ResponseEntity<Page<FrameResponseDto>>(frameService.findFrameList(user, regionList, pageable), HttpStatus.OK);
        }
    }

    @GetMapping("/counts")
    @ApiOperation(value = "지역별 스티커프레임 개수 조회", notes = "지역별로 공유된 스티커 프레임의 개수를 조회한다.")
    public ResponseEntity<?> getFrameListCountsByRegion() {
        //로그인 완료되면 token으로 User 가져올 예정
        User user = null;
        if(user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else{
            return new ResponseEntity<FrameCountResponseDto>(frameService.findFrameListCount(), HttpStatus.OK);
        }
    }

    @GetMapping("/{frameId}")
    @ApiOperation(value = "스티커 프레임 상세 조회", notes = "하나의 공유된 스티커 프레임을 상세 조회한다.")
    public ResponseEntity<?> getFrame(@PathVariable long frameId) {
        //로그인 완료되면 token으로 User 가져올 예정
        User user = null;
        if(user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else{
            return new ResponseEntity<StickerFrameResponseDto>(frameService.findFrame(user, frameId), HttpStatus.OK);
        }
    }

    @ApiOperation(value = "공유된 스티커 프레임 삭제", notes = "다이어리가 아닌 공유한 스티커 프레임만 삭제한다.")
    @DeleteMapping
    public ResponseEntity<?> deleteFrame(@RequestBody final int frameId){
        try{
            //로그인 완료되면 token으로 User 가져올 예정
            User user = null;
            if(user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else{
                int deleteResult = frameService.deleteFrame(user, frameId);
                if(deleteResult==403) return new ResponseEntity<String>("사용자가 스티커 프레임의 소유자가 아닙니다.", HttpStatus.NOT_ACCEPTABLE);
                else return new ResponseEntity<String>("스티커 프레임 삭제 성공", HttpStatus.OK);
            }
        } catch (Exception e){
            return new ResponseEntity<String>("스티커 프레임 삭제 실패", HttpStatus.FORBIDDEN);
        }
    }
}
