package com.trippiece.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name="badge")
public class Badge extends BaseEntity{
    @Column(nullable = false, unique = true)
    private String name;

    @Column
    private String description;

    @Column
    private String badgeImage;

    @OneToMany(mappedBy = "badge")
    private List<MyBadge> myBadges = new ArrayList<>();
    public void addMyBadge(MyBadge myBadge) {
        this.myBadges.add(myBadge);

        if (myBadge.getBadge() != this) {
            myBadge.update(myBadge.getUser(), this);
        }
    }

    @Builder
    public Badge(String name, String description, String badgeImage){
        this.name = name;
        this.description = description;
        this.badgeImage = badgeImage;
    }
}
