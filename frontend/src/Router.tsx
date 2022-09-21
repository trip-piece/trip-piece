import styled from "@emotion/styled";
import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { Landing, Main, TripList, MyPage } from "./Pages";
import BasicModal from "./Pages/Modal";
=======
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
>>>>>>> 59444ba8745f43b71fe127e5f1094e0005003049

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
<<<<<<< HEAD
        <Route path="modal" element={<BasicModal />} />
        <Route path="mypage" element={<MyPage />} />
=======
        <Route path="trips/:tripId/diarys" element={<TripDiaryList />}>
          <Route path=":diaryDate" element={<TripDiaryPage />} />
        </Route>
        <Route
          path="trips/:tripId/diarys/write"
          element={<DiaryManagement />}
        />
>>>>>>> 59444ba8745f43b71fe127e5f1094e0005003049
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
