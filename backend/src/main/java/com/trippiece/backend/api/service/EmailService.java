package com.trippiece.backend.api.service;

import com.trippiece.backend.api.domain.entity.Place;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final S3Service s3Service;

    public void sendQRCode(Place place, String imgPath){
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            message.setFrom("ppclass403@gmail.com");
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(place.getManagerEmail(),place.getName()+"담당자님", "UTF-8"));
            message.setSubject("[여행조각] " + place.getName() + " 이벤트 QR코드 발급 메일");

            String mailForm = "<div style='width:960px; margin:0 auto;'>";
            mailForm += "<table  cellpadding='0' cellspacing='0' border='0' width='960' align='left' valign='middle' style='margin:0 auto; padding:0; min-width:960px; border:1px solid #ebebeb; font-family:'맑은 고딕', 'Malgun Gothic', '돋움', Dotum, sans-serif; font-size:18px; color:#666666; letter-spacing:-1.3px; line-height:1.8;'>";
            mailForm += "<tbody>";
            mailForm += "<tr>";
            mailForm += "<td width='70' height='80'></td>";
            mailForm += "<td width='820' height='80'></td>";
            mailForm += "<td width='70' height='80'></td>";
            mailForm += "</tr>";
            mailForm += "<tr>";
            mailForm += "<td height='30'></td>";
            mailForm += "<td height='30' align='right'>";
//            mailForm += "<a href='http://i7a403.p.ssafy.io'><img src='https://ifh.cc/g/FT3sGT.png' alt='핑퐁클래스 로고' style='height:58px;'/></a>";
            mailForm += "</td>";
            mailForm += "<td height='30'></td>";
            mailForm += "</tr>";
            mailForm += "<tr>";
            mailForm += "<td height='30'></td>";
            mailForm += "<td height='30'></td>";
            mailForm += "<td height='30'></td>";
            mailForm += "</tr>";
            mailForm += "<tr>";
            mailForm += "<td></td>";
            mailForm += "<td>";
            mailForm += "<p style='font-size:40px; color:#333333; font-weight:300; line-height:1; letter-spacing:-4px;'>이벤트 QR코드 안내</p>";
            mailForm += "</td>";
            mailForm += "<td></td>";
            mailForm += "</tr>";
            mailForm += "<tr>";
            mailForm += "<td height='30'></td>";
            mailForm += "<td height='30'></td>";
            mailForm += "<td height='30'></td>";
            mailForm += "</tr>";
            mailForm += "<tr>";
            mailForm += "<td></td>";
            mailForm += "<td>";
            mailForm += "<p style='font-size:16px;'>안녕하세요, 이벤트 담당자님<br/> 새로 갱신된 QR코드를 안내해드립니다.<br/>해당 QR코드로 이벤트 진행 부탁드립니다.</p>";
            mailForm += "</td>";
            mailForm += "<td></td>";
            mailForm += "</tr>";
            mailForm += "<tr>";
            mailForm += "<td height='15'></td>";
            mailForm += "<td height='15'></td>";
            mailForm += "<td height='15'></td>";
            mailForm += "</tr>";
            mailForm += "<tr>";
            mailForm += "<td></td>";
            mailForm += "<td style='padding:30px; background:#f5f5f5; text-align:center;'>";
            mailForm += "<p style='font-size:25px; font-weight:500; color:#333333;'><img src='https://" + s3Service.CLOUD_FRONT_DOMAIN_NAME + "/" + imgPath + "' alt='qr이미지' style='height:400px;'/></p>";
            mailForm += "</td>";
            mailForm += "<td></td>";
            mailForm += "</tr>";
            mailForm += "<tr>";
            mailForm += "<td height='15'></td>";
            mailForm += "<td height='15'></td>";
            mailForm += "<td height='15'></td>";
            mailForm += "</tr>";
            mailForm += "<tr>";
            mailForm += "<td></td>";
            mailForm += "<td>";
            mailForm += "<p style='font-size:16px;'>감사합니다.</p>";
            mailForm += "</td>";
            mailForm += "<td></td>";
            mailForm += "</tr>";
            mailForm += "<tr>";
            mailForm += "<td width='70' height='80'></td>";
            mailForm += "<td width='820' height='80'></td>";
            mailForm += "<td width='70' height='80'></td>";
            mailForm += "</tr>";
            mailForm += "</tbody>";
            mailForm += "</table>";
            mailForm += "</div>";
            message.setText(mailForm, "UTF-8", "html");
            javaMailSender.send(message);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
