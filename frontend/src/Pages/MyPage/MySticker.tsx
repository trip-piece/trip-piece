import React from "react";
import { Helmet } from "react-helmet-async";
import UserInfo from "./UserInfo";
import Tap from "./Tap";
import MyStickerList from "./MyStickerList";

function MySticker() {
  return (
    <>
      <Helmet>
        <title>보유 NFT 스티커 | 여행조각</title>
      </Helmet>

      <UserInfo />
      <Tap />
      <MyStickerList />
    </>
  );
}

export default MySticker;
