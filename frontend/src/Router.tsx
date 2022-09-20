import styled from "@emotion/styled";
import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TripDiaryPage from "./Pages/TripDiary/TripDiaryPage";

const Landing = lazy(() => import("./Pages/Landing/LandingPage"));
const Main = lazy(() => import("./Pages/Main/MainPage"));
const TripDiaryList = lazy(
  () => import("./Pages/TripDiaryList/TripDiaryListPage"),
);
const TripList = lazy(() => import("./Pages/TripList/TripListPage"));
const DiaryManagement = lazy(
  () => import("./Pages/DiaryManagement/DiaryManagementPage"),
);

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
        <Route path="trips/:tripId/diarys" element={<TripDiaryList />}>
          <Route path="write" element={<DiaryManagement />} />
          <Route path=":diaryDate" element={<TripDiaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
