import React, { useState } from "react";

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import Title from "./Title";
import Camera from "./Camera";

function QrScanner() {
  // const [locationInfo, setLocationInfo] = useRecoilValue();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Helmet>
        <title>QR 스캔 | 여행조각</title>
      </Helmet>
      <Title title="QR코드 스캔" />
      <Camera />
    </motion.div>
  );
}

export default QrScanner;
