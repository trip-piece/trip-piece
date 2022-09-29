package com.trippiece.backend.util;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DateConverter {

    public LocalDate convert(String date) {
        LocalDate convertedDate = LocalDate.parse(date);
        return convertedDate;
    }
}
