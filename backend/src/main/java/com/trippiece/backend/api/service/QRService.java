package com.trippiece.backend.api.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.trippiece.backend.api.domain.dto.CustomMultipartFile;
import com.trippiece.backend.api.domain.entity.Place;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class QRService {

    private final S3Service s3Service;

    public String QRMake(Place place) {
        String content = "https://i7a607.p.ssafy.io/places/"+place.getId();
        String fileName;
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 100, 100);
            BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
            fileName = place.getName()+"_QR";
            String imgPath = s3Service.qrUpload(place.getQrImage(), bufferedImage, fileName);
            return imgPath;
        } catch (WriterException e){
            e.printStackTrace();
            return "fail";
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
    }
}
