package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.response.FrameResponseDto;
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

import java.util.List;

@Api(value = "스팟/축제 같은 장소 관련 API", tags={"Place"})
@RestController
@CrossOrigin("*")
@RequestMapping("/places")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;
    @GetMapping
    @ApiOperation(value = "스팟/축제 리스트 조회", notes = "다양한 필터링을 포함하여 공유된 스티커 프레임의 리스트를 조회한다.")
    public ResponseEntity<?> getPlaceList(@RequestParam long regionId, @RequestParam int type, Pageable pageable) {
        if(type!=1 && type!=0) return new ResponseEntity<String>("유효한 type이 아닙니다.", HttpStatus.BAD_REQUEST);
        if(regionId<0 || regionId>17) return new ResponseEntity<String>("유효한 regionId가 아닙니다.", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Page<PlaceResponseDto>>(placeService.findPlaceList(regionId, type, pageable), HttpStatus.OK);
    }
}
