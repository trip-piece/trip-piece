package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.CountListDto;
import com.trippiece.backend.api.domain.dto.response.*;
import com.trippiece.backend.api.domain.entity.*;
import com.trippiece.backend.api.domain.repository.*;
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

@Service
@RequiredArgsConstructor
public class FrameService {

    private final FrameRepository frameRepository;
    private final RegionRepository regionRepository;
    private final ScrapRepository scrapRepository;
    private final DecorationRepository decorationRepository;

    private final DiaryRepository diaryRepository;
    @Transactional
    //프레임 리스트 조회 및 검색(지역필터링)
    public Page<FrameResponseDto> findFrameList(final User user, final List<Long> regionList, Pageable pageable) {
        List<Frame> list = new ArrayList<>();
        if (regionList.isEmpty()) list = frameRepository.findAll();
        else {
            for (long i : regionList) {
                Region region = regionRepository.findById(i).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
                ;
                list.addAll(frameRepository.findAllByRegionOrderByIdDesc(region));
            }
        }
        List<FrameResponseDto> responseList = new ArrayList<>();
        for (Frame frame : list) {
            responseList.add(new FrameResponseDto(frame, scrapRepository.existsByFrameAndUser(frame, user)));
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), responseList.size());
        Page<FrameResponseDto> result = new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());
        return result;
    }
    @Transactional
    //지역별 공유된 스티커프레임 개수 조회
    public FrameCountResponseDto findFrameListCount() {
        List<Region> regionList = regionRepository.findAll();
        List<CountListDto> countList = new ArrayList<>();
        for (Region region : regionList) {
            countList.add(new CountListDto(region.getId(), frameRepository.findAllByRegionOrderByIdDesc(region).size()));
        }
        List<Frame> list = frameRepository.findAll();
        int countAll = list.size();
        FrameCountResponseDto result = new FrameCountResponseDto(countList, countAll);
        return result;
    }

    @Transactional
    public void addFrame(long diaryId, String fileName) {
        Region region = diaryRepository.findById(diaryId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND)).getTrip().getRegion();
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));

        Frame frame = Frame.builder()
                .diary(diary)
                .region(region)
                .frameImage(fileName)
                .build();
        frameRepository.save(frame);
    }

    @Transactional
    public void updateFrame(long diaryId, String fileName) {
        Region region = diaryRepository.findById(diaryId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND)).getTrip().getRegion();
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Frame frame = frameRepository.findByDiary(diary);
        System.out.println(diary);
        System.out.println(region);
        System.out.println(fileName);
        frame.updateFrame(diary, region, fileName);
    }
    @Transactional
    //스티커 프레임 상세 조회
    public StickerFrameResponseDto findFrame(final User user, final long frameId) {
        Frame frame = frameRepository.findById(frameId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        List<StickerDecorationDto> stickerList = new ArrayList<>();
        List<Decoration> decorationList = decorationRepository.findAllByDiary(frame.getDiary());
        for (Decoration decoration : decorationList) {
            stickerList.add(new StickerDecorationDto(decoration));
        }
        boolean isScrapped = scrapRepository.existsByFrameAndUser(frame, user);
        StickerFrameResponseDto result = new StickerFrameResponseDto(stickerList, isScrapped);
        return result;
    }

    //스티커 프레임 삭제
    @Transactional
    public int deleteFrame(final User user, final long frameId) {
        int resultCode = 200;
        Frame frame = frameRepository.findById(frameId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        if (!frame.getDiary().getUser().equals(user)) resultCode = 406;
        else {
            frameRepository.delete(frame);
        }
        return resultCode;
    }

    //스티커 프레임 스크랩
    @Transactional
    public void scrapFrame(final User user, final long frameId) {
        Frame frame = frameRepository.findById(frameId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Scrap scrap = Scrap.builder()
                .user(user)
                .frame(frame)
                .build();
        scrapRepository.save(scrap);
    }

    //스티커 프레임 스크랩 해제
    @Transactional
    public void deleteFrameScrap(final User user, final long frameId) {
        Frame frame = frameRepository.findById(frameId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Scrap scrap = scrapRepository.findByFrameAndUser(frame, user);
        scrapRepository.delete(scrap);
    }
}


