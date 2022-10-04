import React, { useState } from "react";

import { Helmet } from "react-helmet-async";

import Title from "./Title";
import Camera from "./Camera";

function QrScanner() {
  // const [locationInfo, setLocationInfo] = useRecoilValue();
  return (
    <>
      <Helmet>
        <title>QR 스캔 | 여행조각</title>
      </Helmet>
      <Title title="QR코드 스캔" />
      <Camera />
    </>
  );
}

export default QrScanner;
