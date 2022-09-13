package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.response.*;
import com.trippiece.backend.api.domain.entity.*;
import com.trippiece.backend.api.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FrameService {

    private final FrameRepository frameRepository;
    private final RegionRepository regionRepository;
    private final ScrapRepository scrapRepository;
    private final DecorationRepository decorationRepository;

    //프레임 리스트 조회 및 검색(지역필터링)
    public Page<FrameResponseDto> findFrameList(final User user, final List<Long> regionList, Pageable pageable){
        List<Frame> list = new ArrayList<>();
        if(regionList.isEmpty()) list = frameRepository.findAll();
        else {
            for(long i : regionList) {
                Region region = regionRepository.getOne(i);
                list.addAll(frameRepository.findAllByRegionOrderByIdDesc(region));
            }
        }
        List<FrameResponseDto> responseList = new ArrayList<>();
        for(Frame frame : list){
            responseList.add(new FrameResponseDto(frame, scrapRepository.existsByFrameAndUser(user, frame)));
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), responseList.size());
        Page<FrameResponseDto> result = new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());
        return result;
    }

    //지역별 공유된 스티커프레임 개수 조회
    public FrameCountResponseDto findFrameListCount(){
        List<Region> regionList = regionRepository.findAll();
        List<CountListDto> countList = new ArrayList<>();
        for(Region region : regionList){
            countList.add(new CountListDto(region.getId(), frameRepository.findAllByRegionOrderByIdDesc(region).size()));
        }
        List<Frame> list = frameRepository.findAll();
        int countAll = list.size();
        FrameCountResponseDto result = new FrameCountResponseDto(countList, countAll);
        return result;
    }

    //스티커 프레임 상세 조회
    public StickerFrameResponseDto findFrame(final User user, final long frameId){
        Frame frame = frameRepository.getOne(frameId);
        List<StickerDecorationDto> stickerList = new ArrayList<>();
        List<Decoration> decorationList = decorationRepository.findAllByDiary(frame.getDiary());
        for(Decoration decoration : decorationList) {
            stickerList.add(new StickerDecorationDto(decoration));
        }
        boolean isScrapped = scrapRepository.existsByFrameAndUser(user, frame);
        StickerFrameResponseDto result = new StickerFrameResponseDto(stickerList, isScrapped);
        return result;
    }

    //스티커 프레임 삭제
    @Transactional
    public int deleteFrame(final User user, final long frameId){
        int resultCode = 200;
        Frame frame = frameRepository.getOne(frameId);
        if(!frame.getDiary().getUser().equals(user)) resultCode=406;
        else {
            frameRepository.delete(frame);
        }
        return resultCode;
    }

    //스티커 프레임 스크랩
    @Transactional
    public void scrapFrame(final User user, final long frameId){
        Frame frame = frameRepository.getOne(frameId);
        Scrap scrap = Scrap.builder()
                .user(user)
                .frame(frame)
                .build();
        scrapRepository.save(scrap);
    }

    //스티커 프레임 스크랩 해제
    @Transactional
    public void deleteFrameScrap(final User user, final long frameId){
        Frame frame = frameRepository.getOne(frameId);
        Scrap scrap = scrapRepository.findByFrameAndUser(user, frame);
        scrapRepository.delete(scrap);
    }
}


