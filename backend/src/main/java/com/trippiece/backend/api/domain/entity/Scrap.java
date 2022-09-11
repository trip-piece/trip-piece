package com.trippiece.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@Table(name="scrap")
public class Scrap extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "diary_id")
    Diary diary;


    public Scrap update(User user, Diary diary){
        this.user = user;
        this.diary = diary;
        return this;
    }

    @Builder
    public Scrap(User user, Diary diary){
        this.user = user;
        this.diary = diary;
    }
}
