import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import UserInfo from "./UserInfo";
import Tap from "./Tap";
import MyStickerList from "./MyStickerList";
import Sticker from "./Sticker";

function MyPage() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>보유스티커 | 여행조각</title>
        </Helmet>
      </HelmetProvider>

      <UserInfo />
      <Tap />
      <MyStickerList>
        <Sticker />
      </MyStickerList>
    </>
  );
}

export default MyPage;
