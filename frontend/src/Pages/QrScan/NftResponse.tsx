import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Title from "./Title";
import Content from "./Content";
import { QrInfoState } from "../../store/atom";

function NftResponse() {
  const { regionId, code } = useParams();
  const [recoilQrState, setRecoilQrState] = useRecoilState(QrInfoState);
  const url: string = recoilQrState.url as string;
  // 여기서 넘어와서 검증을 하고?
  // const baseUrl = "j7a607.q.ssafy.io";
  // const baseUrl2 = "http://localhost:3000/";

  // console.log(url);
  // if (regax.test(url)) {
  //   validateLink({ result: "success" });
  //   window.location = recoilQrState.url;
  // } else {
  //   validateLink({ result: "incorrect" });
  //   console.log("올바르지않은 URL 형식");
  // }

  // 정규표현식
  const regax =
    /^(http(s)?:\/\/)(localhost:3000)(\/)(places)(\/)([\d]{1,2})(\/)([a-zA-Z0-9!@#$%^&]{10})/g;
  return (
    <>
      <Helmet>
        <title>QR 스캔 | 여행조각</title>
      </Helmet>
      <Title title="서울 SEOUL" />
      <Content
        result="success"
        stickerName="2022 역삼 멀티캠퍼스"
        stickerUrl="이미지경로"
      />
    </>
  );
}

export default NftResponse;
