package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.response.PlaceResponseDto;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.service.PlaceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Api(value = "이벤트 스팟/축제 장소 관련 API", tags={"Place"})
@RestController
@CrossOrigin("*")
@RequestMapping("/places")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;

    @GetMapping
    @ApiOperation(value = "스팟/축제 리스트 조회", notes = "다양한 필터링을 포함하여 이벤트 스팟/축제의 리스트를 조회한다.")
    public ResponseEntity<?> getPlaceList(@RequestParam long regionId, @RequestParam int type, Pageable pageable) {
        if(type!=1 && type!=0) return new ResponseEntity<String>("유효한 type이 아닙니다.", HttpStatus.BAD_REQUEST);
        if(regionId<0 || regionId>17) return new ResponseEntity<String>("유효한 regionId가 아닙니다.", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Page<PlaceResponseDto>>(placeService.findPlaceList(regionId, type, pageable), HttpStatus.OK);
    }

    @ApiOperation(value = "이벤트 스팟/축제 삭제", notes = "이벤트 스팟/축제를 삭제한다.")
    @DeleteMapping
    public ResponseEntity<?> deletePlace(@RequestBody final Map<String, Long> request){
        long placeId = request.get("placeId");
        try{
            placeService.deletePlace(placeId);
            return new ResponseEntity<String>("이벤트 장소/축제 삭제 성공", HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("이벤트 장소/축제 삭제 실패", HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation(value = "이벤트 스팟/축제 활성화 및 비활성화", notes = "활성화된 이벤트 스팟/축제를 비활성화하거나, 비활성화된 이벤트 스팟/축제를 활성화한다.")
    @PatchMapping("/active")
    public ResponseEntity<?> updatePlaceState(@RequestBody final Map<String, Long> request){
        long placeId = request.get("placeId");
        try{
            placeService.updateState(placeId);
            return new ResponseEntity<String>("이벤트 장소/축제 활성화 및 비활성화 성공", HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("이벤트 장소/축제 활성화 및 비활성화 실패", HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation(value = "사용자가 QR인식", notes = "사용자가 QR인식을 하고 스티커를 발급받으면 QRLog를 저장하고 Place의 amount값을 수정한다.")
    @PatchMapping("/QR")
    public ResponseEntity<?> doQRLog(@RequestBody final Map<String, Long> request){
        long placeId = request.get("placeId");
        long stickerId = request.get("stickerId");
        try{
            //로그인 완료되면 token으로 User 가져올 예정
            User user = null;
            if(user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                placeService.insertQRLog(user, placeId, stickerId);
                placeService.updatePlaceAmount(placeId);
                return new ResponseEntity<String>("사용자 QR Log 저장 및 Place Amount 수정 성공", HttpStatus.OK);
            }
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("사용자 QR Log 저장 및 Place Amount 수정 실패", HttpStatus.FORBIDDEN);
        }
    }
}
