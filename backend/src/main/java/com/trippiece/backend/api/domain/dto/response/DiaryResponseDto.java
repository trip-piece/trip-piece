package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Diary;
import com.trippiece.backend.api.domain.entity.Trip;
import com.trippiece.backend.api.service.S3Service;
import io.swagger.annotations.Api;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@Api("DiaryResponse")
public class DiaryResponseDto {
    private long id;
    private long tripId;
    private String content;
    private int fontType;
    private int backgroundColor;
    private int weather;

    private String location;
    private List<StickerDecorationDto> stickerList;
    private boolean isShare;
    private String todayPhoto;

    @Autowired
    S3Service s3Service;

    public DiaryResponseDto(Diary diary, boolean isShare, List<StickerDecorationDto> stickerList) {
        this.id = diary.getId();
        this.content = diary.getContent();
        this.fontType = diary.getFontType();
        this.backgroundColor = diary.getBackgroundColor();
        this.weather = diary.getWeather();
        this.location = diary.getLocation();
        this.tripId = diary.getTrip().getId();
        this.stickerList = stickerList;
        this.isShare = isShare;
        if (diary.getTodayPhoto() == null || diary.getTodayPhoto().equals("")) this.todayPhoto = null;
        else this.todayPhoto = "https://" + s3Service.CLOUD_FRONT_DOMAIN_NAME + "/" + diary.getTodayPhoto();


    }

}
