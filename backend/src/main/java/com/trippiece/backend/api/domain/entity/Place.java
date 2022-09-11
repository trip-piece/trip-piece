package com.trippiece.backend.api.domain.entity;

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

    @Column(nullable = false)
    private String qrImage;

    @Column(nullable = false)
    private boolean activated = false;

    @Builder
    public Place (int type, String name, Region region, String locationAddress,
                 float lat, float lng, LocalDate startDate, LocalDate endDate, String posterImage,
                 int amount, String qrImage, boolean activated) {
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
        this.qrImage=qrImage;
        this.activated=activated;
    }
}
