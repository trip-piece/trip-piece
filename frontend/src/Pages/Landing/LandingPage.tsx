import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setCookie } from "../../utils/cookie";
import { IUserInfo, UserInfoState } from "../../store/atom";

import LoginButton from "./LoginButton";
import LadingButton from "./LandingButton";
import Content from "./Text";

import loginApis, { walletAddress } from "../../utils/apis/userApis";
import axiosInstance from "../../utils/apis/api";

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
  const { userInfo, setUserInfo } = useRecoilState(UserInfoState);
  const navigate = useNavigate();
  const address: walletAddress = { wallet: account };
  useEffect(() => {
    login(address);
  }, [account]);

  const login = async (data: string | null | undefined | walletAddress) => {
    await axiosInstance
      .post(loginApis.login, data)
      .then(
        (response: { data: { accessToken: string; refreshToken: string } }) => {
          setCookie("accessToken", response.data.accessToken);
          setCookie("refreshToken", response.data.refreshToken);
          setUserInfo({ address: { account }, isLoggedIn: true });
          navigate("/main");
        },
      );
  };

  const handleActivate = async () => {
    console.log(active);

    // if (active) {
    //   //메타마스크와 연결되있으면 바로 main으로
    //   login(address);
    //   //deactivate();
    //   console.log(account);
    //   return;
    // }

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
