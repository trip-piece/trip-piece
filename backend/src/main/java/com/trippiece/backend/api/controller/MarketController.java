package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.request.MarketRequestDto;
import com.trippiece.backend.api.domain.dto.response.MarketStickerResponseDto;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.service.MarketService;
import com.trippiece.backend.api.service.UserService;
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

import java.util.Map;

@Api(value = "마켓 관련 API", tags = {"Market"})
@RestController
@CrossOrigin("*")
@RequestMapping("/market")
@RequiredArgsConstructor
public class MarketController {

    private final MarketService marketService;
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping
    @ApiOperation(value = "스티커마켓등록", notes = "스티커 판매를 위해 등록한다.")
    public ResponseEntity<?> addMarketSticker(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody MarketRequestDto.Register request) {
        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.findOneUser(userId);
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                marketService.addMarketSticker(user, request.getTokenId(), request.getPrice());
                return new ResponseEntity<>("마켓에 스티커 등록 성공!", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("마켓에 스티커 등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @GetMapping
    @ApiOperation(value = "스티커 검색/조회", notes = "사용자가 마켓에서 등록된 스티커 조회")
    public ResponseEntity<?> getMarketStickers(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestParam long regionId, @RequestParam int sort, @RequestParam(required = false) String keyword, @PageableDefault(size = 10) Pageable pageable) {
        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.findOneUser(userId);
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            if (sort > 2) return new ResponseEntity<String>("유효한 sort가 아닙니다.", HttpStatus.BAD_REQUEST);
            if (regionId < 0 || regionId > 17)
                return new ResponseEntity<String>("유효한 regionId가 아닙니다.", HttpStatus.BAD_REQUEST);
            return new ResponseEntity<Page<MarketStickerResponseDto>>(marketService.findMarketSticker(regionId, sort, keyword, pageable), HttpStatus.OK);
        }
    }

    @GetMapping("/my")
    @ApiOperation(value = "내 스티커 검색/조회", notes = "사용자가 마켓에 등록한 스티커 조회")
    public ResponseEntity<?> getMyMarketStickers(@RequestHeader("ACCESS_TOKEN") final String accessToken, @PageableDefault(size = 10) Pageable pageable) {
        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.findOneUser(userId);
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else return new ResponseEntity<Page<MarketStickerResponseDto>>(marketService.findMyStickers(user, pageable), HttpStatus.OK);
    }

    @GetMapping("/{marketId}")
    @ApiOperation(value = "스티커 상세 조회", notes = "사용자가 클릭한 스티커 조회")
    public ResponseEntity<?> getMarketStickerDetail(@RequestHeader("ACCESS_TOKEN") final String accessToken, @PathVariable(value="marketId") long marketId) {
        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.findOneUser(userId);
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            return new ResponseEntity<>(marketService.findMarketStickerDetail(marketId), HttpStatus.OK);
        }
    }

    @DeleteMapping
    @ApiOperation(value = "스티커 판매 목록에서 제거", notes = "스티커가 판매완료되어 목록에서 제거")
    public ResponseEntity<?> deleteMarketSticker(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody MarketRequestDto.Delete request) {
        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.findOneUser(userId);
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                marketService.deleteMarketSticker(user, request.getMarketId());
                return new ResponseEntity<String>("스티커 판매 완료", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("스티커 판매 실패!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}