package com.trippiece.backend.api.controller;

import com.trippiece.backend.api.domain.dto.response.FrameResponseDto;
import com.trippiece.backend.api.domain.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "스팟/축제 같은 장소 관련 API", tags={"Place"})
@RestController
@CrossOrigin("*")
@RequestMapping("/places")
@RequiredArgsConstructor
public class PlaceController {

}
