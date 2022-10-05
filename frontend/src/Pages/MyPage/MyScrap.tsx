import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import UserInfo from "./UserInfo";
import Tap from "./Tap";
import MyScrapList from "./MyScrapList";

function MyScrap() {
  return (
    <>
      <Helmet>
        <title>내 스크랩 | 여행조각</title>
      </Helmet>

      <UserInfo />
      <Tap type={1} />
      <MyScrapList />
    </>
  );
}

export default MyScrap;
