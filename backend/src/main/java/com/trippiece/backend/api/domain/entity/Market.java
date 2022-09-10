package com.trippiece.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name="market")
public class Market {
    //BaseEntity 상속으로 인해 삭제 예정 Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private float price;

    //추후 User와 관계설정으로 수정 예정
    @Column(nullable = false)
    private long userId;

    @ManyToOne
    @JoinColumn(name = "sticker_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Sticker sticker;

    @Builder
    public Market(float price, long userId, Sticker sticker){
        this.price=price;
        this.userId=userId;
        this.sticker=sticker;
    }
}
