package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.request.PlaceRequestDto;
import com.trippiece.backend.api.domain.dto.response.PlaceResponseDto;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.service.PlaceService;
import com.trippiece.backend.api.service.S3Service;
import com.trippiece.backend.api.service.UserService;
import com.trippiece.backend.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Api(value = "이벤트 스팟/축제 장소 관련 API", tags={"Place"})
@RestController
@CrossOrigin("*")
@RequestMapping("/places")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;
    private final S3Service s3Service;
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping
    @ApiOperation(value = "스팟/축제 등록", notes = "이벤트가 열릴 스팟이나 축제를 등록한다.")
    public ResponseEntity<?> addPlace(@RequestPart(value="place")PlaceRequestDto.PlaceRegister place, @RequestPart(value = "posterImage") MultipartFile posterImage) throws IOException {
        try {
            if(posterImage==null) return new ResponseEntity<String>("PosterImage가 필요합니다.", HttpStatus.BAD_REQUEST);
            if(posterImage.getSize()>=10485760) return new ResponseEntity<String>("이미지 크기 제한은 10MB 입니다.", HttpStatus.FORBIDDEN);
            String originFile = posterImage.getOriginalFilename();
            String originFileExtension = originFile.substring(originFile.lastIndexOf("."));
            if (!originFileExtension.equalsIgnoreCase(".jpg") && !originFileExtension.equalsIgnoreCase(".png")
                    && !originFileExtension.equalsIgnoreCase(".jpeg")) {
                return new ResponseEntity<String>("jpg, jpeg, png의 이미지 파일만 업로드해주세요", HttpStatus.FORBIDDEN);
            }
            String posterImagePath = s3Service.upload("",posterImage);
            placeService.insertPlace(place, posterImagePath);
            return new ResponseEntity<String>("이벤트 스팟/축제 등록 성공", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("이벤트 스팟/축제 등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/edit")
    @ApiOperation(value = "스팟/축제 수정", notes = "이벤트가 열릴 스팟이나 축제의 정보를 수정한다.")
    public ResponseEntity<?> editPlace(@RequestPart(value="place")PlaceRequestDto.PlaceEdit place, @RequestPart(value = "posterImage", required = false) MultipartFile posterImage) throws IOException {
        try {
            String posterImagePath = "";
            if(posterImage!=null) {
                if (posterImage.getSize() >= 10485760)
                    return new ResponseEntity<String>("이미지 크기 제한은 10MB 입니다.", HttpStatus.FORBIDDEN);
                String originFile = posterImage.getOriginalFilename();
                String originFileExtension = originFile.substring(originFile.lastIndexOf("."));
                if (!originFileExtension.equalsIgnoreCase(".jpg") && !originFileExtension.equalsIgnoreCase(".png")
                        && !originFileExtension.equalsIgnoreCase(".jpeg")) {
                    return new ResponseEntity<String>("jpg, jpeg, png의 이미지 파일만 업로드해주세요", HttpStatus.FORBIDDEN);
                }
                posterImagePath = s3Service.upload("", posterImage);
            }
            placeService.updatePlace(place, posterImagePath);
            return new ResponseEntity<String>("이벤트 스팟/축제 수정 성공", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("이벤트 스팟/축제 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @ApiOperation(value = "스팟/축제 리스트 조회", notes = "다양한 필터링을 포함하여 이벤트 스팟/축제의 리스트를 조회한다.")
    public ResponseEntity<?> getPlaceList(@RequestParam long regionId, @RequestParam int type, Pageable pageable) {
        if(type!=1 && type!=0) return new ResponseEntity<String>("유효한 type이 아닙니다.", HttpStatus.BAD_REQUEST);
        if(regionId<0 || regionId>17) return new ResponseEntity<String>("유효한 regionId가 아닙니다.", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Page<PlaceResponseDto>>(placeService.findPlaceList(regionId, type, pageable), HttpStatus.OK);
    }

    @GetMapping("/{placeId}")
    @ApiOperation(value = "스팟/축제 상세 조회", notes = "하나의 이벤트 스팟/축제의 상세정보를 조회한다.")
    public ResponseEntity<?> getPlaceList(@PathVariable long placeId) {
        return new ResponseEntity<PlaceResponseDto>(placeService.findPlace(placeId), HttpStatus.OK);
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
            return new ResponseEntity<String>("이벤트 장소/축제 삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
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
            return new ResponseEntity<String>("이벤트 장소/축제 활성화 및 비활성화 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "사용자가 QR인식", notes = "사용자가 QR인식을 하고 스티커를 발급받으면 QRLog를 저장하고 Place의 amount값을 수정한다.")
    @PatchMapping("/QR")
    public ResponseEntity<?> doQRLog(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody final Map<String, Long> request){
        long placeId = request.get("placeId");
        long stickerId = request.get("stickerId");
        try{
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.findOneUser(userId);
            if(user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                placeService.insertQRLog(user, placeId, stickerId);
                placeService.updatePlaceAmount(placeId);
                return new ResponseEntity<String>("사용자 QR Log 저장 및 Place Amount 수정 성공", HttpStatus.OK);
            }
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("사용자 QR Log 저장 및 Place Amount 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
