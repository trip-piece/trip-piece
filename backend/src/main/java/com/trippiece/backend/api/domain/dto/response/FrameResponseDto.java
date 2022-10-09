package com.trippiece.backend.api.domain.dto.response;

import com.trippiece.backend.api.domain.entity.Frame;
import com.trippiece.backend.api.domain.repository.ScrapRepository;
import com.trippiece.backend.api.service.S3Service;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
public class FrameResponseDto {
    private long frameId;
    private String frameImage;
    private long diaryId;
    private boolean isScrapped;

    @Autowired
    S3Service s3Service;


    public FrameResponseDto(Frame frame, boolean isScrapped){
        this.frameId=frame.getId();
      this.frameImage = "https://" + s3Service.CLOUD_FRONT_DOMAIN_NAME + "/" + frame.getFrameImage();
        this.diaryId=frame.getDiary().getId();
        this.isScrapped=isScrapped;
    }
}
