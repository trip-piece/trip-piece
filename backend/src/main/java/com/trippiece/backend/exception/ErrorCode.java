package com.trippiece.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    //예시
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다.");
    ;

    private final HttpStatus status;
    private final String message;
}
