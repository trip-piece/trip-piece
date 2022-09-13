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

    //매일 자정에 실행
    @Scheduled(cron= "0 0 0 * * *", zone = "Asia/Seoul")
    public void everyDay_0_00_RankingJob() {
        System.out.println("활성화/비활성화 작업 시작");
        List<Place> placeList = placeRepository.findAll();
        LocalDate today = LocalDate.now();
        for(Place place : placeList){
            if(today.compareTo(place.getStartDate())>=0 && today.compareTo(place.getEndDate())<=0) {
                if(!place.isActivated()) place.updateState();
            } else {
                if(place.isActivated()) place.updateState();
            }
        }
        System.out.println("활성화/비활성화 작업 완료");

        System.out.println("활성화된 스팟/축제 QR 생성 작업 시작");

        System.out.println("활성화된 스팟/축제 QR 생성 작업 완료");
    }
}
