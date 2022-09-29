import styled from "@emotion/styled";
import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MySticker, MyScrap } from "./Pages";
import MarketListPage from "./Pages/Market/MarketListPage";
import MarketMainPage from "./Pages/Market/MarketMainPage";
import MarketRegisterPage from "./Pages/Market/MarketRegisterPage";
import StickerDetailPage from "./Pages/Market/StickerDetailPage";
import TripDiaryPage from "./Pages/TripDiary/TripDiaryPage";
import Navbar from "./Pages/Navbar/Navbar";
import Admin from "./Pages/Admin/AdminPage";
import NftRegister from "./Pages/Admin/NftRegisterPage";
import QrScanner from "./Pages/QrScan/QrReader";

const Landing = lazy(() => import("./Pages/Landing/LandingPage"));
const Main = lazy(() => import("./Pages/Main/MainPage"));
const TripDiaryList = lazy(
  () => import("./Pages/TripDiaryList/TripDiaryListPage"),
);
const TripList = lazy(() => import("./Pages/TripList/TripListPage"));
const DiaryManagement = lazy(
  () => import("./Pages/DiaryManagement/DiaryManagementPage"),
);
const DiaryDecoration = lazy(
  () => import("./Pages/DiaryDecoration/DiaryDecorationPage"),
);
const StickerMapMain = lazy(() => import("./Pages/Place/PlaceMainPage"));
const StickerMapFiltering = lazy(
  () => import("./Pages/Place/PlaceListPage"),
);

const NftResponse = lazy(() => import("./Pages/QrScan/NftResponse"));

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
        <Route path="admin/nft" element={<NftRegister />} />
        <Route path="trips/:tripId/diarys" element={<TripDiaryList />}>
          <Route path=":diaryDate" element={<TripDiaryPage />} />
        </Route>
        <Route
          path="trips/:tripId/diarys/:diaryDate/write"
          element={<DiaryManagement />}
        />
        <Route
          path="trips/:tripId/diarys/:diaryDate/decoration"
          element={<DiaryDecoration />}
        />
        <Route path="market" element={<MarketMainPage />} />
        <Route path="market/:regionId" element={<MarketListPage />} />
        <Route path="market/:marketId/detail" element={<StickerDetailPage />} />
        <Route path="market/register" element={<MarketRegisterPage />} />
        <Route path="user/scraps" element={<MyScrap />} />
        <Route path="user/stickers" element={<MySticker />} />
        <Route path="places/map" element={<StickerMapMain />} />
        <Route path="places/information" element={<StickerMapFiltering />} />
        <Route path="qrscan" element={<QrScanner />} />
        <Route path="/places/:placeId" element={<NftResponse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
