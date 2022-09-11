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
@Table(name="my_badge")
public class MyBadge extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    User user;

    @ManyToOne
    @JoinColumn(name = "badge_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    Badge badge;

    public MyBadge update(User user, Badge badge){
        this.user = user;
        this.badge = badge;
        return this;
    }

    @Builder
    public MyBadge(User user, Badge badge){
        this.user = user;
        this.badge = badge;
    }
}
