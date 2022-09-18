import styled from "@emotion/styled";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Main, TripList, MyPage } from "./Pages";
import BasicModal from "./Pages/Modal";

const Header = styled.header`
  height: 10vh;
`;
function Router() {
  return (
    <BrowserRouter>
      <Header>
        <nav />
      </Header>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="main" element={<Main />} />
        <Route path="trips" element={<TripList />} />
        <Route path="modal" element={<BasicModal />} />
        <Route path="mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
