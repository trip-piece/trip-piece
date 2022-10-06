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
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);
  //const navigate = useNavigate();

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();

    if (getCookie("isLogin")) {
      removeCookie("isLogin");
    }

    e.returnValue = ""; // Chrome에서 동작하도록;
  };

  useEffect(() => {
    (() => {
      window.addEventListener("unload", preventClose);
    })();
    return () => {
      window.removeEventListener("unload", preventClose);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn && getCookie("accessToken")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/*" element={<AnotherRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
