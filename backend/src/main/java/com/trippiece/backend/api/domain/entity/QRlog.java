package com.trippiece.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name="qrlog")
public class QRlog {
    //BaseEntity 상속으로 인해 삭제 예정 Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //추후 User와 관계설정으로 수정 예정
    @Column(nullable = false)
    private long userId;

    @ManyToOne
    @JoinColumn(name="place_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Place place;

    @ManyToOne
    @JoinColumn(name = "sticker_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Sticker sticker;

    @Column(nullable = false)
    private LocalDateTime regtime = LocalDateTime.now();

    @Builder
    public QRlog(long userId, Place place, Sticker sticker){
        this.userId=userId;
        this.place=place;
        this.sticker=sticker;
    }
}
