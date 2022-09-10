package com.trippiece.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name="region")
public class Region {
    //BaseEntity 상속으로 인해 삭제 예정 Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 10)
    private String name;

    @Builder
    public Region(String name){
        this.name = name;
    }
}