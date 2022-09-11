package com.trippiece.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name="region")
public class Region extends BaseEntity {
    @Column(nullable = false, length = 10)
    private String name;

    @Builder
    public Region(String name){
        this.name = name;
    }
}