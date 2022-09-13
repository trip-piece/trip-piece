package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.entity.Place;
import com.trippiece.backend.api.domain.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@EnableScheduling
@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final PlaceRepository placeRepository;
    private final QRService qrService;
    private final PlaceService placeService;
    private final EmailService emailService;

    //매일 자정에 실행
    @Scheduled(cron= "0 0 0 * * *", zone = "Asia/Seoul")
    public void everyDay_0_00_RankingJob() {
        System.out.println("활성화/비활성화 작업 시작");
        List<Place> placeList = placeRepository.findAll();
        LocalDate today = LocalDate.now();
        for (Place place : placeList) {
            if (today.compareTo(place.getStartDate()) >= 0 && today.compareTo(place.getEndDate()) <= 0) {
                if (!place.isActivated()) placeService.updateState(place.getId());
            } else {
                if (place.isActivated()) placeService.updateState(place.getId());
            }
        }
        System.out.println("활성화/비활성화 작업 완료");

        System.out.println("활성화된 스팟/축제 QR 생성 작업 시작");
        List<Place> activedPlaceList = placeRepository.findAllByActivated(true);
        for (Place place : activedPlaceList) {
            String imgPath = qrService.QRMake(place);
            if(imgPath.equals("fail")) {
                System.out.println("활성화된 스팟/축제 QR 생성 작업 중 문제 발생");
                return ;
            } else {
                placeService.updateQRImage(place.getId(), imgPath);
                emailService.sendQRCode(place, imgPath);
            }
        }
        List<Place> notactivedPlaceList = placeRepository.findAllByActivated(false);
        for (Place place : notactivedPlaceList) {
            if(place.getQrImage()!=null) {
                placeService.updateQRImage(place.getId(), "");
            }
        }
        System.out.println("활성화된 스팟/축제 QR 생성 작업 완료");
    }
}
