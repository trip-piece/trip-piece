package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.dto.request.DecoRequestDto;
import com.trippiece.backend.api.domain.dto.request.DiaryRequestDto;
import com.trippiece.backend.api.domain.dto.response.DiaryResponseDto;
import com.trippiece.backend.api.domain.dto.response.StickerDecorationDto;
import com.trippiece.backend.api.domain.entity.*;
import com.trippiece.backend.api.domain.repository.*;
import com.trippiece.backend.exception.CustomException;
import com.trippiece.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
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
    private final UserRepository userRepository;
    private final StickerRepository stickerRepository;
    private final FrameRepository frameRepository;

    /*일기 내용 추가*/
    @Transactional
    public void addDiary(DiaryRequestDto.DiaryRegister diaryRegister) {
        Trip trip = tripRepository.findById(diaryRegister.getTripId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        ;
        User user = userRepository.findById(diaryRegister.getUserId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        ;

        Diary diary = Diary.builder()
                .content(diaryRegister.getContent())
                .createDate(LocalDateTime.now())
                .fontType(diaryRegister.getFontType())
                .backgroundColor(diaryRegister.getBackgroundColor())
                .weather(diaryRegister.getWeather())
                .todayPhoto(diaryRegister.getTodayPhoto())
                .trip(trip)
                .user(user)
                .build();
        diaryRepository.save(diary);
    }

    /*꾸민 스티커 위치 추가*/
    @Transactional
    public void addDeco(DecoRequestDto decoRequestDto) {
        Diary diary = diaryRepository.findById(decoRequestDto.getDiaryId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        //토큰아이디 몰랑
        List<StickerDecorationDto> list = decoRequestDto.getStickerList();
        for (StickerDecorationDto st : list) {
            Decoration decoration = Decoration.builder()
                    .diary(diary)
                    .sticker(stickerRepository.getOne(st.getTokenId()))
                    .x(st.getX())
                    .y(st.getY())
                    .build();
            decorationRepository.save(decoration);
        }

    }

    @Transactional
    public void updateDeco(DecoRequestDto decoRequestDto) {
        Diary diary = diaryRepository.findById(decoRequestDto.getDiaryId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        //원래 sticker
        List<Decoration> list = decorationRepository.findAllByDiary(diary);
        List<StickerDecorationDto> originStickerList = new ArrayList<>();
        List<StickerDecorationDto> deleteStickerList = new ArrayList<>();
        for (Decoration decoration : list) {
            originStickerList.add(new StickerDecorationDto(decoration));
            deleteStickerList.add(new StickerDecorationDto(decoration));
        }

        //변경된 sticker
        List<StickerDecorationDto> newStickerList = (ArrayList<StickerDecorationDto>) decoRequestDto.getStickerList();
        List<StickerDecorationDto> updateStickerList = new ArrayList<>();
        for (StickerDecorationDto decoration : newStickerList) {
            updateStickerList.add(decoration);
        }
        Collections.sort(newStickerList);

        if (!newStickerList.equals(originStickerList)) {
            updateStickerList.removeAll(originStickerList);
            deleteStickerList.removeAll(newStickerList);

            if (deleteStickerList.size() != 0) {
                for (StickerDecorationDto stickerDecorationDto : deleteStickerList) {
                    Decoration decoration = decorationRepository.findById(stickerDecorationDto.getId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
                    decorationRepository.delete(decoration);
                }
            }

            if (updateStickerList.size() != 0) {
                for (StickerDecorationDto stickerDecorationDto : updateStickerList) {
                    Decoration decoration = decorationRepository.findById(stickerDecorationDto.getId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
                    decorationRepository.save(new Decoration(decoration.getSticker(), decoration.getDiary(), decoration.getX(), decoration.getY()));
                }
            }
        }
    }

    /*일기 조회*/
    @Transactional
    public DiaryResponseDto findDiary(final long tripId, LocalDate date) {
        boolean isShare = false;
        Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Diary diary = diaryRepository.findByTripAndCreateDate(trip, date);
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
    public void updateDiary(DiaryRequestDto.DiaryEdit diaryEdit, long diaryId) {
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Trip trip = tripRepository.findById(diaryEdit.getTripId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        diary.updateDiary(diaryEdit, trip);
    }


    @Transactional
    public void deleteDiary(final long diaryId) {
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        diaryRepository.delete(diary);
    }

}
