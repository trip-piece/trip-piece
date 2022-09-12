package com.trippiece.backend.api.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "스티커 프레임 공유 관련 API", tags={"Frame"})
@RestController
@CrossOrigin("*")
@RequestMapping("/frames")
@RequiredArgsConstructor
public class FrameController {
}
