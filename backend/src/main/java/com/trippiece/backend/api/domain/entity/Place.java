package com.trippiece.backend.api.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@Table(name="place" )
public class Place {

    //BaseEntity 상속으로 인해 삭제 예정 Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int type;

    @Column(nullable = false)
    private String name;

    //JoinColumn. Table 생성 후 연관관계 설정 예정
    @Column(nullable = false)
    private long regionId;

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
}
