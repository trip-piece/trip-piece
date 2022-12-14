package com.trippiece.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name="sticker")
public class Sticker extends BaseEntity {
    @Column(nullable = false)
    private long tokenId;

    @Column(nullable = false)
    private String tokenName;

    @Column(name = "token_url", nullable = false)
    private String tokenURL;

    @ManyToOne
    @JoinColumn(name="place_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Place place;

    @Builder
    public Sticker(long tokenId, String tokenName, String tokenURL, Place place){
        this.tokenId=tokenId;
        this.tokenName=tokenName;
        this.tokenURL=tokenURL;
        this.place=place;
    }
}
