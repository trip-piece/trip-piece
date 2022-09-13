package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.dto.StickerDto;
import com.trippiece.backend.api.domain.entity.Place;
import com.trippiece.backend.api.service.S3Service;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;

@Getter
public class PlaceResponseDto {
    private long id;
    private float lat;
    private float lng;
    private LocalDate startDate;
    private LocalDate endDate;
    private long regionId;
    private String regionName;
    private int type;
    private String qrImage;
    private List<StickerDto> stickerList;
    private boolean activated;
    private String name;
    private String locationAddress;
    private String posterImage;
    private int amount;

    @Autowired
    S3Service s3Service;
    public PlaceResponseDto(Place place, List<StickerDto> stickerList){
        this.id=place.getId();
        this.lat=place.getLat();
        this.lng=place.getLng();
        this.startDate=place.getStartDate();
        this.endDate=place.getEndDate();
        this.regionId=place.getRegion().getId();
        this.regionName=place.getRegion().getName();
        this.type=place.getType();
        if(this.qrImage!=null && !this.qrImage.equals("")) this.qrImage="https://" + s3Service.CLOUD_FRONT_DOMAIN_NAME + "/" + place.getQrImage();
        else this.qrImage=place.getQrImage();
        this.stickerList=stickerList;
        this.activated=place.isActivated();
        this.name=place.getName();
        this.locationAddress=place.getLocationAddress();
        if(this.posterImage!=null && !this.posterImage.equals("")) this.posterImage="https://" + s3Service.CLOUD_FRONT_DOMAIN_NAME + "/" + place.getPosterImage();
        else this.posterImage=place.getPosterImage();
        this.amount=place.getAmount();
    }
}
