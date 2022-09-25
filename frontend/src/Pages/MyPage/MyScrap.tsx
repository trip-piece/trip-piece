import React from "react";
import { Helmet } from "react-helmet-async";
import UserInfo from "./UserInfo";
import Tap from "./Tap";
import MyScrapList from "./MyScrapList";

function MyPage() {
  return (
    <>
      <Helmet>
        <title>내 스크랩 | 여행조각</title>
      </Helmet>

      <UserInfo />
      <Tap />
      <MyScrapList />
    </>
  );
}

export default MyPage;