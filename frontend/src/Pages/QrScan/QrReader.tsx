import React from "react";

import { Helmet } from "react-helmet-async";

import Title from "./Title";
import Camera from "./Camera";



function QrScanner() {
  return (
    <>
      <Helmet>
        <title>QR 스캔 | 여행조각</title>
      </Helmet>
      <Title title="QR코드 스캔" location="현재 GPS위치" />
      <Camera />
    </>
  );
}

export default QrScanner;
