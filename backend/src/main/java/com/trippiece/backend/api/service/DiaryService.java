package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.request.DecoRequestDto;
import com.trippiece.backend.api.domain.dto.request.DiaryRequestDto;
import com.trippiece.backend.api.domain.dto.request.StickerRequestDto;
import com.trippiece.backend.api.domain.dto.response.DiaryResponseDto;
import com.trippiece.backend.api.domain.dto.response.StickerDecorationDto;
import com.trippiece.backend.api.domain.entity.*;
import com.trippiece.backend.api.domain.repository.*;
import com.trippiece.backend.exception.CustomException;
import com.trippiece.backend.exception.ErrorCode;
import com.trippiece.backend.util.DateConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final TripRepository tripRepository;
    private final DiaryRepository diaryRepository;
    private final DecorationRepository decorationRepository;

    private final StickerRepository stickerRepository;
    private final FrameRepository frameRepository;
    private final DateConverter dateConverter;



    /*일기 내용 추가*/
    @Transactional
    public long addDiary(User user, DiaryRequestDto.DiaryRegister diaryRegister) {
        Trip trip = tripRepository.findById(diaryRegister.getTripId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        LocalDate convertedDate = dateConverter.convert(diaryRegister.getDiaryDate());
        Diary diary = Diary.builder()
                .content(diaryRegister.getContent())
                .createDate(LocalDateTime.now())
                .fontType(diaryRegister.getFontType())
                .diaryDate(convertedDate)
                .location(diaryRegister.getLocation())
                .backgroundColor(diaryRegister.getBackgroundColor())
                .weather(diaryRegister.getWeather())
                .todayPhoto(diaryRegister.getTodayPhoto())
                .ratio(diaryRegister.getRatio())
                .trip(trip)
                .user(user)
                .build();
        return diaryRepository.save(diary).getId();
    }

    /*꾸민 스티커 위치 추가*/
    @Transactional
    public void addDeco(DecoRequestDto.DecoRegister request) {
        Diary diary = diaryRepository.findById(request.getDiaryId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        List<StickerRequestDto.StickerDecoRegister> list = request.getStickerList();
        for (StickerRequestDto.StickerDecoRegister st : list) {
            Decoration decoration = Decoration.builder()
                    .diary(diary)
                    .sticker(stickerRepository.findByTokenId(st.getTokenId()))
                    .x(st.getX())
                    .y(st.getY())
                    .build();
            decorationRepository.save(decoration);
        }

    }

    @Transactional
    public void updateDeco(DecoRequestDto.DecoRegister request) {
        Diary diary = diaryRepository.findById(request.getDiaryId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        List<Decoration> deleteList = decorationRepository.findAllByDiary(diary); //다이어리에 있는 데코레이션 목록 다 가져와
        for (Decoration deco : deleteList) {
            decorationRepository.delete(deco);
        }
        List<StickerRequestDto.StickerDecoRegister> newList = request.getStickerList();
        for (StickerRequestDto.StickerDecoRegister st : newList) {
            Decoration decoration = Decoration.builder()
                    .diary(diary)
                    .sticker(stickerRepository.findByTokenId(st.getTokenId()))
                    .x(st.getX())
                    .y(st.getY())
                    .build();
            decorationRepository.save(decoration);
        }

    }

    @Transactional
    public int checkDiary(long tripId, String date) {
        int resultCode = 200;
        Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        LocalDate diaryDate = dateConverter.convert(date);
        Diary diary = diaryRepository.findByTripAndDiaryDate(trip, diaryDate);
        if (diary != null) {
            resultCode = 409;
        }
        return resultCode;
    }

    /*일기 조회*/
    @Transactional
    public DiaryResponseDto findDiary(final long tripId, String date) {
        boolean isShare = false;
        Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        LocalDate diaryDate = dateConverter.convert(date);
        Diary diary = diaryRepository.findByTripAndDiaryDate(trip, diaryDate);
        if (diary == null) {
            return null;
        }
        List<Decoration> list = decorationRepository.findAllByDiary(diary);
        List<StickerDecorationDto> deco = list.stream().map(StickerDecorationDto::new).collect(Collectors.toList());

        //개선 필요

        Frame frame = frameRepository.findByDiary(diary);
        if (frame != null) {
            isShare = true;
        }
        return new DiaryResponseDto(diary, isShare, deco);
    }

    @Transactional
    public int updateDiary(User user, DiaryRequestDto.DiaryEdit diaryEdit, long diaryId) {
        int resultCode = 200;
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Trip trip = tripRepository.findById(diaryEdit.getTripId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        if (!diary.getUser().equals(user)) resultCode = 406;
        else {
            diary.updateDiary(diaryEdit, trip);
        }
        return resultCode;
    }


    @Transactional
    public int deleteDiary(User user, final long diaryId) {
        int resultCode = 200;
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        if (!diary.getUser().equals(user)) resultCode = 406;
        else {
            diaryRepository.delete(diary);
        }
        return resultCode;
    }

}
