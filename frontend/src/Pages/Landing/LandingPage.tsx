import React, { useEffect, useRef } from "react";

import { Helmet } from "react-helmet-async";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { NavigateFunction, useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
import { useRecoilState } from "recoil";
import Web3 from "web3";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { getCookie, setCookie } from "../../utils/cookie";
// import { IUserInfo, UserInfoState } from "../../store/atom";

import LoginButton from "./LoginButton";
import LadingButton from "./LandingButton";
import Content from "./Text";

import userApis, { walletAddress } from "../../utils/apis/userApis";
import axiosInstance from "../../utils/apis/api";
import { IUserInfo, UserInfoState } from "../../store/atom";
import getAddressFrom from "../../utils/AddressExtractor";

const injected = new InjectedConnector({});

/**
connector: 현재 dapp에 연결된 월렛의 connector 값
library: web3 provider 제공
chainId: dapp에 연결된 account의 chainId
account: dapp에 연결된 account address
active: dapp 유저가 로그인 된 상태인지 체크
activate: dapp 월렛 연결 기능 수행 함수
deactivate: dapp 월렛 연결 해제 수행 함수
*/

// const onClickDeactivate = () => {
//   deactivate();
// };
function moveToMain(func: NavigateFunction) {
  const navigate = func;
  navigate("/main");
}

export default function LandingPage() {
  const { activate, active, account } = useWeb3React();
  const navigate = useNavigate();
  const address: walletAddress = { walletAddress: account };

  const [userInfoState, setUserInfoState] = useRecoilState(UserInfoState);

  let userInfoInit: IUserInfo = {
    address: "",
    nickname: "",
    balance: "0.0",
    isLoggedIn: false,
    id: -2,
    tripCount: 0,
    diaryCount: 0,
  };
  const getUserBalance = () => {
    const testnet = "https://ropsten.infura.io/";
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://ropsten.infura.io/v3/30efd277df944219b2c456fbb66f632d",
      ),
    );
    console.log("web3 연결");
    if (account) {
      const address_temp = account;
      console.log(address_temp);

      // console.log(pubKey);

      const userBalance = web3.eth
        .getBalance(address_temp)
        .then((balance) => {
          console.log(balance);
          return web3.utils.fromWei(balance, "ether");
        })
        .then((eth) => {
          console.log(eth);
        });

      console.log(userBalance);
      // userInfoInit.balance = userBalance;
      setUserInfoState(userInfoInit);
    }
  };
  const getUserInfo = () => {
    console.log("정보가져와");

    axiosInstance.get(userApis.getUser).then(
      (response: {
        data: {
          userId: number;
          walletAddress: string;
          nickName: string;
          tripCount: number;
          diaryCount: number;
        };
      }) => {
        console.log("test : " + response.data.walletAddress);

        userInfoInit = {
          address: response.data.walletAddress,
          nickname: response.data.nickName,
          balance: "-1.0",
          isLoggedIn: true,
          id: response.data.userId,
          tripCount: response.data.tripCount,
          diaryCount: response.data.diaryCount,
        };
        console.log(`response${userInfoInit.balance}`);
        setUserInfoState(userInfoInit);
        console.log(userInfoState);
        getUserBalance();
      },
    );
  };

  const login = async (
    data: string | null | undefined | walletAddress,
    // props: IUserInfo,
  ) => {
    await axiosInstance
      .post(userApis.login, data)
      .then(
        (response: { data: { accessToken: string; refreshToken: string } }) => {
          setCookie("accessToken", response.data.accessToken);
          setCookie("refreshToken", response.data.refreshToken);
          console.log("로그인완료");
          getUserInfo();
        },
      );
  };
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      login(address);
      //getUserInfo();
      //getUserBalance();
      //setUserInfoState(userInfoInit);
      // moveToMain(navigate);
    }
  }, [account]);

  const handleActivate = async (event: Event) => {
    event.preventDefault();
    console.log(`연결상태 : ${active}`);

    setCookie("accessToken", null);
    setCookie("refreshToken", null);

    if (active) {
      console.log("메타마스크 연결되있지롱 ~");
      login(address);
      //getUserInfo();
      // getUserBalance();
      //setUserInfoState(userInfoInit);
      //moveToMain(navigate);

      // 여기서 쿠키 체크
      // 메타마스크와 연결되있으면 바로 main으로
      // login(address);
      // deactivate();
      // console.log(userInfoInit);
      return;
    }

    if (!active) {
      activate(injected, async () => {});
    }
  };
  return (
    <>
      <Helmet>
        <title>Welcome | 여행조각</title>
      </Helmet>

      <Content />
      <LoginButton func={handleActivate} />
      <LadingButton />
    </>
  );
}

//export default LandingPage;
