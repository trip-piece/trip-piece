package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.StickerDto;
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


