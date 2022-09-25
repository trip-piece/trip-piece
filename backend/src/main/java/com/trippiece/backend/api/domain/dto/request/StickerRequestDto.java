package com.trippiece.backend.api.domain.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@ApiModel("StickerRequest")
public class StickerRequestDto {
    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class StickerDecoRegister {
        @ApiModelProperty(name = "토큰아이디", example = "1")
        private long tokenId;
        @ApiModelProperty(name = "스티커x위치", example = "3.45324")
        private float x;

        @ApiModelProperty(name = "스티커y위치", example = "34.4352")
        private float y;
    }

//    @Getter
//    @Setter
//    @NoArgsConstructor(access = AccessLevel.PROTECTED)
//    public static class StickerDecoEdit {
//
//        @ApiModelProperty(name="스티커 아이디",example = "1")
//        private long stickerId;
//
//       @ApiModelProperty(name = "토큰아이디", example = "1")
//        private long tokenId;
//
//        @ApiModelProperty(name = "스티커x위치", example = "3.45324")
//        private float x;
//
//        @ApiModelProperty(name = "스티커y위치", example = "34.4352")
//        private float y;
//    }

}
