package com.trippiece.backend.api.domain.dto.request;
import com.trippiece.backend.api.domain.dto.response.StickerDecorationDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ApiModel("DecoRequest")
public class DecoRequestDto {
    @ApiModelProperty(name = "다이어리아이디", example = "1")
    long diaryId;

    //헷갈리지마세오옹
    private List<StickerDecorationDto> stickerList;



}
