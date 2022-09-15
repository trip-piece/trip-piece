package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.response.MarketStickerResponseDto;
import com.trippiece.backend.api.domain.dto.response.TripResponseDto;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.service.MarketService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @PostMapping
    @ApiOperation(value = "스티커마켓등록", notes = "스티커판매를 위해 등록한다.")
    public ResponseEntity<?> addMarketSticker(@RequestBody long tokenId, float price) {
        User user = null;
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            marketService.addMarketSticker(user, tokenId, price);
        }
        return new ResponseEntity<>("마켓에 스티커 등록 성공!", HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "스티커 검색/조회", notes = "사용자가 마켓에서 등록된 스티커 조회")
    public ResponseEntity<?> getMarketStickers(@RequestParam long regionId, @RequestParam int sort, Pageable pageable) {
        User user = null;
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            if (sort > 2) return new ResponseEntity<String>("유효한 sort가 아닙니다.", HttpStatus.BAD_REQUEST);
            if (regionId < 0 || regionId > 17)
                return new ResponseEntity<String>("유효한 regionId가 아닙니다.", HttpStatus.BAD_REQUEST);
            return new ResponseEntity<Page<MarketStickerResponseDto>>(marketService.findMarketSticker(regionId, sort, pageable), HttpStatus.OK);
        }
    }

    @DeleteMapping
    @ApiOperation(value = "스티커 판매 목록에서 제거", notes = "스티커가 판매완료되어 목록에서 제거")
    public ResponseEntity<?> deleteMarketSticker(@RequestBody final Map<String, Long> request) {
        long marketId = request.get("marketId");
        try {
            User user = null;
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                marketService.deleteMarketSticker(user, marketId);
                return new ResponseEntity<String>("스티커 판매 완료", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("스티커 판매 실패!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
