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
public class Badge extends BaseEntity {
    @Column(nullable = false, unique = true, length = 10)
    private String name;

    @Column(nullable = false, length = 50)
    private String description;

    @Column(nullable = false)
    private String badgeImage;

    @Builder
    public Badge(String name, String description, String badgeImage){
        this.name = name;
        this.description = description;
        this.badgeImage = badgeImage;
    }
}
