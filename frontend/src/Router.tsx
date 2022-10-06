import { tr } from "date-fns/locale";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Web3 from "web3";

import AnotherRouter from "./AnotherRouter";
import { Landing } from "./Pages";
import { isLoggedinState, UserInfoState } from "./store/atom";
import axiosInstance from "./utils/apis/api";
import userApis, { IUserData } from "./utils/apis/userApis";
import { getCookie, removeCookie } from "./utils/cookie";

function Router() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedinState);

  const isLogin = () => {
    return isLoggedIn;
  };

  useEffect(() => {
    if (!isLoggedIn && getCookie("accessToken")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Landing />} />
        {isLoggedIn && <Route path="/*" element={<AnotherRouter />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
