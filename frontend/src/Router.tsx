import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Main, TripList } from "./Pages";
import BasicModal from "./Pages/Modal";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="main" element={<Main />} />
        <Route path="trips" element={<TripList />} />
        <Route path="modal" element={<BasicModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
