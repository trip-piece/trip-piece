package com.trippiece.backend.api.domain.entity;

import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Setter
@NoArgsConstructor
@Entity
@Table(name="frame")
public class Frame extends BaseEntity {

    //애초에 여기 테이블을 넘어온거 자체가 공유를 한 것이기 때문에 낫널이 맞다고 생각이 듭니다만.. 쿰척쿵냐쿵
    @Column(nullable = false)
    private String frameImage;

    @ManyToOne
    @JoinColumn(name="diary_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Diary diary;

    @Builder
    public Frame(String frameImage,Diary diary){
        this.frameImage = frameImage;
        this.diary = diary;
    }

}
