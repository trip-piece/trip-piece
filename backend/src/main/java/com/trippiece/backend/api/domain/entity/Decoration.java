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
@Table(name = "deco")
public class Decoration extends BaseEntity{


    @ManyToOne
    @JoinColumn(name="sticker_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Sticker sticker;

    @ManyToOne
    @JoinColumn(name="diary_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Diary diary;

    @Column(nullable = false)
    private float x;

    @Column(nullable = false)
    private float y;

    @Builder
    public Decoration(Sticker sticker,Diary diary,float x,float y){
        this.sticker = sticker;
        this.diary = diary;
        this.x = x;
        this.y = y;
    }
}
