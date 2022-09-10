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
@Table(name = "trip")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //저번에 찾아봤을 때 한글은 3씩 먹는다는 소리가 있어서 10자 생각해서 length 30 잡았습니다.
    @Column(nullable = false, length = 30)
    private String title;

    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate startDate;

    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate endDate;

    //추후 User와 관계설정으로 수정 예정
    @Column(nullable = false)
    private long userId;

    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Region region;

    @Builder
    public Trip(String title, LocalDate startDate, LocalDate endDate, long userId, Region region) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
        this.region = region;
    }
}
