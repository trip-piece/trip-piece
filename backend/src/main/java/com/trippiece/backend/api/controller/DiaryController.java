package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.request.DecoRequestDto;
import com.trippiece.backend.api.domain.dto.request.DiaryRequestDto;

import com.trippiece.backend.api.domain.entity.Diary;
import com.trippiece.backend.api.domain.entity.Trip;
import com.trippiece.backend.api.domain.entity.User;
import com.trippiece.backend.api.domain.repository.DiaryRepository;
import com.trippiece.backend.api.domain.repository.FrameRepository;
import com.trippiece.backend.api.domain.repository.TripRepository;
import com.trippiece.backend.api.service.DiaryService;
import com.trippiece.backend.api.service.FrameService;
import com.trippiece.backend.api.service.S3Service;
import com.trippiece.backend.api.service.UserService;
import com.trippiece.backend.exception.CustomException;
import com.trippiece.backend.exception.ErrorCode;
import com.trippiece.backend.util.DateConverter;
import com.trippiece.backend.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
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
    private final UserService userService;
    private final DiaryRepository diaryRepository;
    private final FrameRepository frameRepository;

    private final JwtTokenUtil jwtTokenUtil;


    @PostMapping("/write")
    @ApiOperation(value = "일기 추가", notes = "새로운 일기를 작성한다")
    public ResponseEntity<?> addDiary(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestPart(value = "diary") DiaryRequestDto.DiaryRegister diaryRegister, @RequestPart(value = "todayPhoto", required = false) MultipartFile todayPhoto) throws IOException {
        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.findOneUser(userId);
            long diaryId;
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                int checkCode = diaryService.checkDiary(diaryRegister.getTripId(), diaryRegister.getDiaryDate());
                if (checkCode == 409) {
                    return new ResponseEntity<String>("중복이야!!!!!!!! 다시써!!!", HttpStatus.CONFLICT);
                }
                if (todayPhoto!=null) {
                    if (todayPhoto.getSize() >= 10485760)
                        return new ResponseEntity<String>("이미지 크기 제한은 10MB 입니다.", HttpStatus.FORBIDDEN);
                    String originFile = todayPhoto.getOriginalFilename();
                    String originFileExtension = originFile.substring(originFile.lastIndexOf("."));
                    if (!originFileExtension.equalsIgnoreCase(".jpg") && !originFileExtension.equalsIgnoreCase(".png")
                            && !originFileExtension.equalsIgnoreCase(".jpeg")) {
                        return new ResponseEntity<String>("jpg, jpeg, png의 이미지 파일만 업로드해주세요", HttpStatus.FORBIDDEN);
                    }
                    String todayPhotoPath = s3Service.upload("", todayPhoto); //입력하면 업로드하러 넘어감
                    diaryRegister.setTodayPhoto(todayPhotoPath);
                }
                diaryId = diaryService.addDiary(user, diaryRegister);
                return new ResponseEntity<Long>(diaryId, HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("일기 작성 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/decoration")
    @ApiOperation(value = "일기 꾸미기", notes = "일기를 보유스티커로 꾸미고 공유할거면 이미지화 해서 저장")
    public ResponseEntity<?> decoDiary(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestPart(value = "decoration") DecoRequestDto.DecoRegister decoRequestDto, @RequestPart(value = "frameImage", required = false) MultipartFile frameImage) throws IOException {
        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.findOneUser(userId);
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                if (frameImage!=null) { //공유하기 ok
                    if (frameImage.getSize() >= 10485760)
                        return new ResponseEntity<String>("이미지 크기 제한은 10MB 입니다.", HttpStatus.FORBIDDEN);
                    String originFile = frameImage.getOriginalFilename();
                    String originFileExtension = originFile.substring(originFile.lastIndexOf("."));
                    if (!originFileExtension.equalsIgnoreCase(".jpg") && !originFileExtension.equalsIgnoreCase(".png")
                            && !originFileExtension.equalsIgnoreCase(".jpeg")) {
                        return new ResponseEntity<String>("jpg, jpeg, png의 이미지 파일만 업로드해주세요", HttpStatus.FORBIDDEN);
                    }
                    String frameImagePath = s3Service.upload("", frameImage);
                    frameService.addFrame(decoRequestDto.getDiaryId(), frameImagePath);
                }
                diaryService.addDeco(decoRequestDto);
                return new ResponseEntity<>("꾸미기 성공!", HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("일기 꾸미기 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @PostMapping
    @ApiOperation(value = "일기 꾸미기 수정", notes = "일기 꾸민 스티커 위치 조정,추가,삭제 등 모두 수정")
    public ResponseEntity<?> editDecoDiary(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestPart(value = "decoration") DecoRequestDto.DecoRegister decoRequestDto, @RequestPart(value = "frameImage", required = false) MultipartFile frameImage) throws IOException {

        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.findOneUser(userId);
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                String currentFilePath = "";
                if (frameImage!=null) { //공유하기 ok
                    if (frameImage.getSize() >= 10485760)
                        return new ResponseEntity<String>("이미지 크기 제한은 10MB 입니다.", HttpStatus.FORBIDDEN);
                    String originFile = frameImage.getOriginalFilename();
                    String originFileExtension = originFile.substring(originFile.lastIndexOf("."));
                    if (!originFileExtension.equalsIgnoreCase(".jpg") && !originFileExtension.equalsIgnoreCase(".png")
                            && !originFileExtension.equalsIgnoreCase(".jpeg")) {
                        return new ResponseEntity<String>("jpg, jpeg, png의 이미지 파일만 업로드해주세요", HttpStatus.FORBIDDEN);
                    }

                    String frameImagePath = s3Service.upload("", frameImage); //입력하면 업로드하러 넘어감
                    frameService.updateFrame(decoRequestDto.getDiaryId(), frameImagePath);
                } else {
                    frameService.deleteFrame(user,decoRequestDto.getDiaryId());
                }

                diaryService.updateDeco(decoRequestDto);
                return new ResponseEntity<>("꾸미기 수정 성공!", HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("일기 꾸미기 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @ApiOperation(value = "일기조회", notes = "작성한 일기 내용을 조회")
    public ResponseEntity<?> getDiary(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestParam final long tripId, @RequestParam String date) {
        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.findOneUser(userId);
        if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        else {
            return new ResponseEntity<>(diaryService.findDiary(tripId, date), HttpStatus.OK);
        }
    }

    @PostMapping("/edit")
    @ApiOperation(value = "일기 내용 수정", notes = "일기 내용 수정한다")
    public ResponseEntity<?> editDiary(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestPart(value = "diary") DiaryRequestDto.DiaryEdit diaryEdit, @RequestPart(value = "todayPhoto", required = false) MultipartFile todayPhoto) throws IOException {
        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.findOneUser(userId);
            String todayPhotoPath = "";
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                if (todayPhoto!=null){ //새로운 파일 넣었을 경우
                    if (todayPhoto.getSize() >= 10485760)
                        return new ResponseEntity<String>("이미지 크기 제한은 10MB 입니다.", HttpStatus.FORBIDDEN);
                    String originFile = todayPhoto.getOriginalFilename();
                    String originFileExtension = originFile.substring(originFile.lastIndexOf("."));
                    if (!originFileExtension.equalsIgnoreCase(".jpg") && !originFileExtension.equalsIgnoreCase(".png")
                            && !originFileExtension.equalsIgnoreCase(".jpeg")) {
                        return new ResponseEntity<String>("jpg, jpeg, png의 이미지 파일만 업로드해주세요", HttpStatus.FORBIDDEN);
                    }
                    // String currentFilePath = diaryRepository.findById(diaryEdit.getDiaryId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND)).getTodayPhoto();
                    todayPhotoPath = s3Service.upload("", todayPhoto); //입력하면 업로드하러 넘어감
                    diaryEdit.setImagePath(todayPhotoPath);
                } else {
                    //파일이 없고, ImagePath도 없는 경우 => 기존 이미지를 삭제할 경우
                    if (diaryEdit.getImagePath().equals("") || diaryEdit.getImagePath().equals(null)) {
                        diaryEdit.setImagePath("");
                    } else {
                        Diary diary = diaryRepository.getOne(diaryEdit.getDiaryId());
                        diaryEdit.setImagePath(diary.getTodayPhoto());
                    }
                }
                int updateResult = diaryService.updateDiary(user, diaryEdit);
                if (updateResult == 406)
                    return new ResponseEntity<String>("사용자가 이 일기의 소유자가 아닙니다.", HttpStatus.NOT_ACCEPTABLE);
                else {
                    return new ResponseEntity<>("일기 내용 수정 성공!", HttpStatus.OK);
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("일기 내용 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping
    @ApiOperation(value = "일기 삭제", notes = "일기삭제 공유된 프레임도 삭제")
    public ResponseEntity<?> deleteDiary(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody final Map<String, Long> request) {
        long diaryId = request.get("diaryId");
        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.findOneUser(userId);
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                int deleteResult = diaryService.deleteDiary(user, diaryId);
                if (deleteResult == 406)
                    return new ResponseEntity<String>("사용자가 이 일기의 소유자가 아닙니다.", HttpStatus.NOT_ACCEPTABLE);
                else return new ResponseEntity<String>("일기 삭제 성공!", HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("일기 삭제 실패!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}