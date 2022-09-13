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
}
