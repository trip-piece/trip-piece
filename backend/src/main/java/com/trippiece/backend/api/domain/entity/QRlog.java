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
@Table(name="qrlog")
public class QRlog extends BaseEntity {
    @Column(nullable = false)
    private String tokenName;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name="place_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Place place;

    @ManyToOne
    @JoinColumn(name = "sticker_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Sticker sticker;

    @Column(nullable = false)
    private LocalDate regtime = LocalDate.now();

    @Builder
    public QRlog (User user, Place place, Sticker sticker){
        this.user=user;
        this.place=place;
        this.sticker=sticker;
        this.tokenName=sticker.getTokenName();
    }
}
