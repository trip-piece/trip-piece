package com.trippiece.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@Table(name="scrap")
public class Scrap extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    User user;

    @ManyToOne
    @JoinColumn(name = "frame_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    Frame frame;

    public Scrap update(User user, Frame frame){
        this.user = user;
        this.frame = frame;
        return this;
    }

    @Builder
    public Scrap(User user, Frame frame){
        this.user = user;
        this.frame = frame;
    }
}
