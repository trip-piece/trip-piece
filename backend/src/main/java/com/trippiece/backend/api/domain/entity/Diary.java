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
@Table(name="diary")
public class Diary extends BaseEntity {

    @Column
    private long content;

    @Column(nullable = false)
    private LocalDateTime createDate = LocalDateTime.now();

    @Column
    private String todayPhoto;



    @Column(nullable = false,columnDefinition="tinyint(2) default 0")
    private int fontType;

    @Column(nullable = false,columnDefinition="tinyint(2) default 0")
    private int backgroundColor;

    @Column(nullable = false,columnDefinition="tinyint(2) default 0")
    private int weather;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name = "trip_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Trip trip;

    @Builder
    public Diary(long content,LocalDateTime createDate,String todayPhoto,int fontType,int backgroundColor,int weather, User user,Trip trip){
      this.content=content;
      this.createDate = createDate;
      this.todayPhoto = todayPhoto;
      this.fontType = fontType;
      this.backgroundColor = backgroundColor;
      this.weather = weather;
      this.user = user;
      this.trip = trip;
    }
}
