package com.trippiece.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor
@Table(name="user")
public class User extends BaseEntity{
    @Column(nullable = false, unique = true)
    private String walletAddress;

    @Column(length = 20)
    @ColumnDefault("undefined")
    private String nickname;

    @Column
    private long firstBadge;

    @Column
    private long secondBadge;

    @Column
    private long thirdBadge;

    @OneToMany(mappedBy = "user")
    private List<Scrap> scraps = new ArrayList<>();
    public void addScrap(Scrap scrap) {
        this.scraps.add(scrap);

        if (scrap.getUser() != this) {
            scrap.update(this, scrap.getDiary());
        }
    }

    @OneToMany(mappedBy = "user")
    private List<MyBadge> myBadges = new ArrayList<>();
    public void addMyBadge(MyBadge myBadge) {
        this.myBadges.add(myBadge);

        if (myBadge.getUser() != this) {
            myBadge.update(this, myBadge.getBadge());
        }
    }

    //양방향 관계를 위해 작성한 코드
    //추후 의논 후 이대로 갈지 or 버릴지 결정
//    @OneToMany(mappedBy = "user")
//    private List<Trip> trips = new ArrayList<>();
//    public void addTrip(Trip trip) {
//        this.trips.add(trip);
//
//        if (trip.getUser() != this) {
//            trip.update(this);
//        }
//    }
//
//    @OneToMany(mappedBy = "user")
//    private List<QRlog> qrlogs = new ArrayList<>();
//    public void addQRlog(QRlog qRlog) {
//        this.qrlogs.add(qRlog);
//
//        if (qRlog.getUser() != this) {
//            qRlog.update(this);
//        }
//    }
//
//    @OneToMany(mappedBy = "user")
//    private List<Market> markets = new ArrayList<>();
//    public void addMarket(Market market) {
//        this.markets.add(market);
//
//        if (market.getUser() != this) {
//            market.update(this);
//        }
//    }

    public User update(String nickname, long firstBadge, long secondBadge, long thirdBadge){
        this.nickname = nickname;
        this.firstBadge = firstBadge;
        this.secondBadge = secondBadge;
        this.thirdBadge = thirdBadge;
        return this;
    }

    @Builder
    public User(String walletAddress, String nickname, long firstBadge,
                long secondBadge, long thirdBadge){
        this.walletAddress = walletAddress;
        this.nickname = nickname;
        this.firstBadge = firstBadge;
        this.secondBadge = secondBadge;
        this.thirdBadge = thirdBadge;
    }
}
