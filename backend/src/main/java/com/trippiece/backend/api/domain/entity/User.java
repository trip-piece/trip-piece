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
    @ColumnDefault("'undefined'")
    private String nickname;

    @Column
    private long firstBadge;

    @Column
    private long secondBadge;

    @Column
    private long thirdBadge;

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
