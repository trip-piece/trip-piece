package com.trippiece.backend.api.domain.entity;

import com.trippiece.backend.api.domain.dto.request.PlaceRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@Table(name="place" )
public class Place extends BaseEntity {

    @Column(nullable = false)
    private String managerEmail;

    @Column(nullable = false)
    private int type;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name="region_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Region region;

    @Column(nullable = false, length = 100)
    private String locationAddress;

    @Column(nullable = false)
    private float lat;

    @Column(nullable = false)
    private float lng;

    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate startDate;

    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate endDate;

    @Column(nullable = false)
    private String posterImage;

    @Column(nullable = false)
    private int amount;

    @Column
    private String qrImage;

    @Column
    private String code;

    @Column(nullable = false)
    private boolean activated = false;

    @Builder
    public Place (int type, String name, Region region, String locationAddress,
                  float lat, float lng, LocalDate startDate, LocalDate endDate, String posterImage, String managerEmail,
                  int amount, boolean activated) {
        this.type=type;
        this.name=name;
        this.region=region;
        this.locationAddress=locationAddress;
        this.lat=lat;
        this.lng=lng;
        this.startDate=startDate;
        this.endDate=endDate;
        this.posterImage=posterImage;
        this.amount=amount;
        this.activated=activated;
        this.managerEmail=managerEmail;
    }

    public void updatePlace(PlaceRequestDto.PlaceEdit request, String posterImage, Region region, boolean activated) {
        if(this.type!=request.getType()) this.type= request.getType();
        if(!this.name.equals(request.getName())) this.type= request.getType();
        if(this.region.getId()!=request.getRegionId()) this.region=region;
        if(!this.locationAddress.equals(request.getLocationAddress())) this.locationAddress=request.getLocationAddress();
        if(this.lat!= request.getLat()) this.lat= request.getLat();
        if(this.lng!= request.getLng()) this.lng= request.getLng();
        if(!this.startDate.equals(request.getStartDate())) this.startDate=request.getStartDate();
        if(!this.endDate.equals(request.getEndDate())) this.endDate=request.getEndDate();
        if(!this.posterImage.equals(posterImage)&&!posterImage.equals("")&&posterImage!=null) this.posterImage=posterImage;
        if(this.amount!= request.getAmount()) this.amount= request.getAmount();
        if(!(this.activated!=activated)) this.activated=activated;
        if(!this.managerEmail.equals(request.getManagerEmail())) this.managerEmail=request.getManagerEmail();
    }

    public void updateState(){
        this.activated=!this.activated;
    }

    public void updatePlaceAmount() { this.amount-=1; }

    public void updateQRImage(String qrImage) { this.qrImage = qrImage; }

    public void updateCode(String code) { this.code = code; }
}
