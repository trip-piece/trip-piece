package com.trippiece.backend.api.domain.dto.request;

import com.trippiece.backend.api.domain.dto.StickerDto;
import com.trippiece.backend.api.domain.dto.newStickerDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

public class PlaceRequestDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class PlaceRegister {
        private String name;
        private long regionId;
        private String locationAddress;
        private String managerEmail;
        private float lat;
        private float lng;
        private String sstartDate;
        private String sendDate;
        private LocalDate startDate;
        private LocalDate endDate;
        private int type;
        private int amount;
        private List<newStickerDto> stickerList;
    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class PlaceEdit {
        private long placeId;
        private String name;
        private long regionId;
        private String locationAddress;
        private String managerEmail;
        private float lat;
        private float lng;
        private String SstartDate;
        private String SendDate;
        private LocalDate startDate;
        private LocalDate endDate;
        private int type;
        private int amount;
        private List<StickerDto> stickerList;
    }
}
