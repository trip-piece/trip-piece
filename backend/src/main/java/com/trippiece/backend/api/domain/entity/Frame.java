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

    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Region region;

    @Builder
    public Frame(String frameImage, Diary diary, Region region){
        this.frameImage = frameImage;
        this.diary = diary;
        this.region = region;
    }

    public void updateFrame(Diary diary,Region region,String fileName){
        this.frameImage = fileName;
        this.diary = diary;
        this.region = region;
    }

}
