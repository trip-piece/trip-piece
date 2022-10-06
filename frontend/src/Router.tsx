import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilState } from "recoil";

import AnotherRouter from "./AnotherRouter";
import ProtectedRoute from "./components/modules/routes/ProtectedRoute";
import { Landing } from "./Pages";
import { isLoggedinState } from "./store/atom";
import { getCookie } from "./utils/cookie";

function Router() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedinState);

  useEffect(() => {
    if (!isLoggedIn && getCookie("accessToken")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}>
          <Route path="/*" element={<AnotherRouter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
