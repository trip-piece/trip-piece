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
public class Market extends BaseEntity {
    @Column(nullable = false)
    private float price;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name = "sticker_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Sticker sticker;

    @Builder
    public Market(float price, User user, Sticker sticker){
        this.price=price;
        this.user=user;
        this.sticker=sticker;
    }
}
