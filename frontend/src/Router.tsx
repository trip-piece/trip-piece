import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Main, TripList } from "./Pages";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="main" element={<Main />} />
        <Route path="trips" element={<TripList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
