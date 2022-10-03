import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import UserInfo from "./UserInfo";
import Tap from "./Tap";
import MyStickerList from "./MyStickerList";

function MySticker() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Helmet>
        <title>보유 NFT 스티커 | 여행조각</title>
      </Helmet>

      <UserInfo />
      <Tap type={0} />
      <MyStickerList />
    </motion.div>
  );
}

export default MySticker;
