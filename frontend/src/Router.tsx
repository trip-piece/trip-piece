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

  const getUserInfo = () => {
    axiosInstance
      .get(userApis.getUser)
      .then((response: { data: IUserData }) => {
        console.log(response.data);

        console.log(userInfo);

        setUserInfo((prev) => ({
          ...prev,
          address: response.data.walletAddress,
          nickname: response.data.nickname,
          balance: "0.0",
          isLoggedIn: true,
          id: response.data.userId,
          tripCount: response.data.tripCount,
          diaryCount: response.data.diaryCount,
        }));
        return response.data.walletAddress;
      })
      .then((address) => {
        const web3 = new Web3(
          new Web3.providers.HttpProvider(import.meta.env.VITE_WEB3_URL),
        );
        if (address) {
          web3.eth
            .getBalance(address)
            .then((balance) => {
              return web3.utils.fromWei(balance, "ether");
            })
            .then((eth) => {
              setUserInfo((prev) => ({ ...prev, balance: eth }));

              //setCookie("isLogin", "true");
              //moveToMain();
              window.location.replace("http://localhost:3000/main");
            });
        }
      });
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
    if (isLoggedIn) getUserInfo();

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
