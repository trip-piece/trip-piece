import React, { useEffect, useRef } from "react";

import { Helmet } from "react-helmet-async";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
import { useRecoilState } from "recoil";
import Web3 from "web3";
import { getCookie, setCookie } from "../../utils/cookie";
// import { IUserInfo, UserInfoState } from "../../store/atom";

import LoginButton from "./LoginButton";
import LadingButton from "./LandingButton";
import Content from "./Text";

import userApis, { walletAddress } from "../../utils/apis/userApis";
import axiosInstance from "../../utils/apis/api";
import { UserInfoState } from "../../store/atom";

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

function LandingPage() {
  const { activate, active, deactivate, account } = useWeb3React();

  const navigate = useNavigate();
  const address: walletAddress = { walletAddress: account };
  const { isLoggedIn, setIsLoggendIn, setBalance } =
    useRecoilState(UserInfoState);

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
          setIsLoggendIn(true);
          navigate("/main");
        },
      );
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      login(address);
    }
  }, [account]);

  useEffect(() => {
    let address_temp: string;

    if (!mounted.current) {
      mounted.current = true;
    } else {
      const testnet = "https://ropsten.infura.io/";

      if (account) {
        address_temp = account;
        const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
        let balance = web3.eth.getBalance(address_temp); // Will give value in.

        balance = web3.fromWei(balance, "ether");
        //balance = web3.toDecimal(balance);
      }

      //getUser정보
    }
  }, [isLoggedIn]);

  const handleActivate = async (event: Event) => {
    event.preventDefault();
    console.log(active);

    if (active) {
      const token = getCookie("accessToken");

      if (token) {
        login(address);
      }
      // 여기서 쿠키 체크
      // 메타마스크와 연결되있으면 바로 main으로
      // login(address);
      // deactivate();
      console.log(account);
      return;
    }

    activate(injected, async () => {});
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

export default LandingPage;
