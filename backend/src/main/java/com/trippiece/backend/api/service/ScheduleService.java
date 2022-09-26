package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.entity.Place;
import com.trippiece.backend.api.domain.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.Date;
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
            String code = getRamdomCode(10);
            String imgPath = qrService.QRMake(place, code);
            if(imgPath.equals("fail")) {
                System.out.println("활성화된 스팟/축제 QR 생성 작업 중 문제 발생");
                return ;
            } else {
                placeService.updateQRImage(place.getId(), imgPath);
                placeService.updateCode(place.getId(), code);
                emailService.sendQRCode(place, imgPath);
            }
        }
        List<Place> notactivedPlaceList = placeRepository.findAllByActivated(false);
        for (Place place : notactivedPlaceList) {
            if(place.getQrImage()!=null) {
                placeService.updateQRImage(place.getId(), "");
                placeService.updateCode(place.getId(), "");
            }
        }
        System.out.println("활성화된 스팟/축제 QR 생성 작업 완료");
    }

    public String getRamdomCode(int size) {
        char[] charSet = new char[] {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '!', '@', '#', '$', '%', '^', '&' };

        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int idx = 0;
        int len = charSet.length;
        for (int i=0; i<size; i++) {
            // idx = (int) (len * Math.random());
            idx = sr.nextInt(len);    // 강력한 난수를 발생시키기 위해 SecureRandom을 사용한다.
            sb.append(charSet[idx]);
        }

        return sb.toString();
    }
}
