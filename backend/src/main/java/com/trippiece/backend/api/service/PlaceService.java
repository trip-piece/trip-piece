package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.StickerDto;
import com.trippiece.backend.api.domain.dto.request.PlaceRequestDto;
import com.trippiece.backend.api.domain.dto.response.PlaceResponseDto;
import com.trippiece.backend.api.domain.entity.*;
import com.trippiece.backend.api.domain.repository.PlaceRepository;
import com.trippiece.backend.api.domain.repository.QRlogRepository;
import com.trippiece.backend.api.domain.repository.RegionRepository;
import com.trippiece.backend.api.domain.repository.StickerRepository;
import com.trippiece.backend.exception.CustomException;
import com.trippiece.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final RegionRepository regionRepository;
    private final StickerRepository stickerRepository;
    private final QRlogRepository qrlogRepository;
    private final QRService qrService;

    //이벤트 스팟/축제 리스트 조회 및 검색(지역필터링, 타입필터링)
    public Page<PlaceResponseDto> findPlaceList(final long regionId, final int type, Pageable pageable){
        List<Place> placeList = new ArrayList<>();
        if(regionId==0) placeList=placeRepository.findAllByTypeAndActivated(type, true);
        else {
            Region region = regionRepository.findById(regionId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
            placeList=placeRepository.findAllByRegionAndTypeAndActivated(region, type, true);
        }

        List<PlaceResponseDto> responseList = new ArrayList<>();
        for(Place place : placeList){
            List<Sticker> list = stickerRepository.findAllByPlace(place);
            List<StickerDto> stickerList = list.stream().map(StickerDto::new).collect(Collectors.toList());
            responseList.add(new PlaceResponseDto(place, stickerList));
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), responseList.size());
        Page<PlaceResponseDto> result = new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());
        return result;
    }

    //이벤트 스팟/축제 등록
    @Transactional
    public void insertPlace(final PlaceRequestDto request, final String posterImage){
        Region region = regionRepository.findById(request.getRegionId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        LocalDate today = LocalDate.now();
        boolean activated = (today.compareTo(request.getStartDate()) >= 0 && today.compareTo(request.getEndDate()) <= 0)? true:false;
        Place placeBuilder = Place.builder()
                .type(request.getType())
                .name(request.getName())
                .region(region)
                .locationAddress(request.getLocationAddress())
                .lat(request.getLat())
                .lng(request.getLng())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .posterImage(posterImage)
                .amount(request.getAmount())
                .activated(activated)
                .build();
        Place place = placeRepository.save(placeBuilder);
        if(activated) {
            String qrImage =qrService.QRMake(place);
            place.updateQRImage(qrImage);
        }

        List<StickerDto> list = request.getStickerList();
        for(StickerDto stickerDto : list) {
            Sticker sticker = Sticker.builder()
                    .tokenId(stickerDto.getTokenId())
                    .place(place)
                    .build();
            stickerRepository.save(sticker);
        }
    }

    //이벤트 스팟/축제 삭제
    @Transactional
    public void deletePlace(final long placeId){
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        placeRepository.delete(place);
    }

    //이벤트 스팟/축제 활성화<->비활성화
    @Transactional
    public void updateState(final long placeId){
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        place.updateState();
    }

    //이벤트 스팟/축제 qrImage 업데이트
    @Transactional
    public void updateQRImage(final long placeId, final String imgPath){
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        place.updateQRImage(imgPath);
    }

    //Place Amount 수정
    @Transactional
    public void updatePlaceAmount(final long placeId){
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        place.updatePlaceAmount();
    }

    //QRLog 등록
    @Transactional
    public void insertQRLog(final User user, final long placeId, final long stickerId){
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Sticker sticker = stickerRepository.findById(stickerId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        QRlog qrlog = QRlog.builder()
                .place(place)
                .user(user)
                .sticker(sticker)
                .build();
        qrlogRepository.save(qrlog);
    }
}


