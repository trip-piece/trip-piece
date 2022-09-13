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
        String content = place.getName()+": "+place.getLocationAddress();
        String fileName;
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 100, 100);
            BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
            fileName = place.getName()+"_QR";
            MultipartFile QRImage = convertBufferedImageToMultipartFile(bufferedImage, fileName);
            String imgPath = s3Service.upload(place.getQrImage(), QRImage);
            return imgPath;
        } catch (WriterException e){
            e.printStackTrace();
            return "fail";
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
    }

    private MultipartFile convertBufferedImageToMultipartFile(BufferedImage image, String fileName){
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            ImageIO.write(image, "png", out);
        } catch (IOException e) {
            log.error("IO Error", e);
            return null;
        }
        byte[] bytes = out.toByteArray();
        return new CustomMultipartFile(bytes, fileName, fileName+".png", "png", bytes.length);
    }
}
