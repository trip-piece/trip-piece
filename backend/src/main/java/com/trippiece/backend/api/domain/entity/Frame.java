package com.trippiece.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name="frame")
public class Frame extends BaseEntity {
    @Column(nullable = false)
    private String frameImage;

    @ManyToOne
    @JoinColumn(name="diary_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Diary diary;

    @Builder
    public Frame(String frameImage, Diary diary){
        this.frameImage = frameImage;
        this.diary = diary;
    }

}
