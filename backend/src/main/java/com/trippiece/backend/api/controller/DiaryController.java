package com.trippiece.backend.api.controller;

import com.sun.org.apache.regexp.internal.RE;
import com.trippiece.backend.api.domain.dto.request.DecoRequestDto;
import com.trippiece.backend.api.domain.dto.request.DiaryRequestDto;
import com.trippiece.backend.api.domain.dto.response.TripResponseDto;
import com.trippiece.backend.api.domain.entity.Diary;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.DecorationRepository;
import com.trippiece.backend.api.domain.repository.DiaryRepository;
import com.trippiece.backend.api.domain.repository.FrameRepository;
import com.trippiece.backend.api.service.DiaryService;
import com.trippiece.backend.api.service.FrameService;
import com.trippiece.backend.api.service.S3Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Api(value = "다이어리 관련 API", tags = {"Diary"})
@RestController
@CrossOrigin("*")
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {
    private final DiaryService diaryService;
    private final S3Service s3Service;

    private final FrameService frameService;

    private final DiaryRepository diaryRepository;
private final FrameRepository frameRepository;


    @PostMapping("/write")
    @ApiOperation(value = "일기 추가", notes = "새로운 일기를 작성한다")
    public ResponseEntity<?> addDiary(@RequestPart(value = "diaryRequestDto") DiaryRequestDto.DiaryRegister diaryRegister, @RequestPart(value = "file", required = false) MultipartFile todayPhoto) throws IOException {
        //지원센세거 가져왔음
        //로그인 완료되면 token으로 User 가져올 예정
        User user = null;
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {

            if (todayPhoto != null) {
                String fileName = s3Service.upload("", todayPhoto); //입력하면 업로드하러 넘어감
                diaryRegister.setTodayPhoto(fileName);
            }
            diaryService.addDiary(diaryRegister);

        }
        return new ResponseEntity<>("일기 작성 성공!", HttpStatus.OK);
    }

    @PostMapping("/decoration")
    @ApiOperation(value = "일기 꾸미기", notes = "일기를 보유스티커로 꾸미고 공유할거면 이미지화 해서 저장")
    public ResponseEntity<?> decoDiary(@RequestPart(value = "diaryRequestDto") DecoRequestDto decoRequestDto, @RequestPart(value = "file", required = false) MultipartFile frameImage) throws IOException {
        User user = null;
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            if (frameImage != null) { //공유하기 ok
                String fileName = s3Service.upload("", frameImage);
                frameService.addFrame(decoRequestDto.getDiaryId(), fileName);
            }
            diaryService.addDeco(decoRequestDto);
        }
        return new ResponseEntity<>("꾸미기 성공!", HttpStatus.OK);
    }

    @PatchMapping
    @ApiOperation(value = "일기 꾸미기 수정", notes = "일기 꾸민 스티커 위치 조정,추가,삭제 등 모두 수정")
    public ResponseEntity<?> editDecoDiary(@RequestPart(value = "diaryRequestDto") DecoRequestDto decoRequestDto, @RequestPart(value = "file", required = false) MultipartFile frameImage) throws IOException {
        User user = null;
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            if (frameImage != null) { //공유하기 ok
                String currentFilePath = frameRepository.getOne(decoRequestDto.getDiaryId()).getFrameImage();
                String fileName = s3Service.upload(currentFilePath, frameImage); //입력하면 업로드하러 넘어감
                frameService.updateFrame(decoRequestDto.getDiaryId(),fileName);
            }
            diaryService.updateDeco(decoRequestDto);
        }
        return new ResponseEntity<>("꾸미기 수정 성공!", HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "일기 조회", notes = "작성한 일기 내용을 조회")
    public ResponseEntity<?> getDiary(@PathVariable("trip_id") long tripId, @PathVariable("date") LocalDate date) {
        User user = null;
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            return new ResponseEntity<>(diaryService.findDiary(tripId, date), HttpStatus.OK);
        }
    }

    @PostMapping("/edit")
    @ApiOperation(value = "일기 내용수정", notes = "일기 내용 수정한다")
    public ResponseEntity<?> editDiary(@RequestPart(value = "diaryRequestDto") DiaryRequestDto.DiaryEdit diaryEdit, @RequestPart(value = "file", required = false) MultipartFile todayPhoto) throws IOException {
        //지원센세거 가져왔음
        //로그인 완료되면 token으로 User 가져올 예정
        User user = null;
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            if (todayPhoto != null) {
                String currentFilePath = diaryRepository.getOne(diaryEdit.getDiaryId()).getTodayPhoto();
                String fileName = s3Service.upload(currentFilePath, todayPhoto); //입력하면 업로드하러 넘어감
                diaryEdit.setTodayPhoto(fileName);
            }
            diaryService.updateDiary(diaryEdit, diaryEdit.getDiaryId());

        }
        return new ResponseEntity<>("일기 수정 성공!", HttpStatus.OK);
    }

    @DeleteMapping
    @ApiOperation(value = "일기 삭제", notes = "일기삭제 공유된 프레임도 삭제")
    public ResponseEntity<?> deleteDiary(@RequestBody final Map<String, Long> request) {
        long diaryId = request.get("diaryId");
        try {
            diaryService.deleteDiary(diaryId);
            return new ResponseEntity<String>("일기 삭제 성공!", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("일기 삭제 실패!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}