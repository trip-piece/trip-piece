import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { Helmet } from "react-helmet-async";
import Title from "./Title";
import Content from "./Content";

function NftResponse() {
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
