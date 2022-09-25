import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import Content from "./Content";
import Title from "./Title";

function QrScanner() {
  return (
    <>
      <Helmet>
        <title>QR 스캔 | 여행조각</title>
      </Helmet>
      <Title title="QR코드 스캔" location="현재 GPS위치" />
      <Content result="success" />
    </>
  );
}

export default QrScanner;
