import styled from "@emotion/styled";
import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyPage } from "./Pages";
import MarketListPage from "./Pages/Market/MarketListPage";
import MarketMainPage from "./Pages/Market/MarketMainPage";
import MarketRegisterPage from "./Pages/Market/MarketRegisterPage";
import StickerDetailPage from "./Pages/Market/StickerDetailPage";
import TripDiaryPage from "./Pages/TripDiary/TripDiaryPage";
import Navbar from "./Pages/Navbar/Navbar";

const Landing = lazy(() => import("./Pages/Landing/LandingPage"));
const Main = lazy(() => import("./Pages/Main/MainPage"));
const TripDiaryList = lazy(
  () => import("./Pages/TripDiaryList/TripDiaryListPage"),
);
const TripList = lazy(() => import("./Pages/TripList/TripListPage"));
const Admin = lazy(() => import("./Pages/Admin/AdminPage"));
const DiaryManagement = lazy(
  () => import("./Pages/DiaryManagement/DiaryManagementPage"),
);

const StickerMapMain = lazy(() => import("./Pages/StickerMap/StickerMapMain"));
const StickerMapFiltering = lazy(
  () => import("./Pages/StickerMap/SpotFestivalMap"),
);

const Header = styled.header`
  height: 10vh;
`;
function Router() {
  return (
    <BrowserRouter>
      <Header>
        <Navbar />
      </Header>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="main" element={<Main />} />
        <Route path="trips" element={<TripList />} />
        <Route path="admin" element={<Admin />} />
        <Route path="trips/:tripId/diarys" element={<TripDiaryList />}>
          <Route path=":diaryDate" element={<TripDiaryPage />} />
        </Route>
        <Route
          path="trips/:tripId/diarys/write"
          element={<DiaryManagement />}
        />
        <Route path="market" element={<MarketMainPage />} />
        <Route path="market/:regionId" element={<MarketListPage />} />
        <Route path="market/:marketId/detail" element={<StickerDetailPage />} />
        <Route path="market/register" element={<MarketRegisterPage />} />
        <Route path="user/stickers" element={<MyPage />} />
        <Route path="places/map" element={<StickerMapMain />} />
        <Route path="places/information" element={<StickerMapFiltering />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
