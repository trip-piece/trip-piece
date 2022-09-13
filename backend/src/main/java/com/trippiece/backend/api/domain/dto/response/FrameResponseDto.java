package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Frame;
import com.trippiece.backend.api.domain.repository.ScrapRepository;
import lombok.Getter;

@Getter
public class FrameResponseDto {
    long frameId;
    String frameImage;
    long diaryId;
    boolean isScrapped;

    public FrameResponseDto(Frame frame, boolean isScrapped){
        this.frameId=frame.getId();
        this.frameImage=frame.getFrameImage();
        this.diaryId=frame.getDiary().getId();
        this.isScrapped=isScrapped;
    }
}
