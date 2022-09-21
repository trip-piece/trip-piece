import React from "react";
import styled from "@emotion/styled";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { setCookie } from "../../utils/cookie";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { logggedInState, UserInfoState } from "../../store/atom";

import LoginButton from "./LoginButton";
import LadingButton from "./LandingButton";
import Content from "./Text";

import fetchData from "../../utils/apis/api";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

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
  const onLogin = async () => {
    try {
      const response = await fetchData.post({
        url: "api/user/login",
        body: { account: { account } },
      });

      if (response.status === 200) {
        setCookie("accessToken", response.data.accessToken);
        setCookie("refreshToken", response.data.refreshToken);
        navigate("/main");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleActivate = () => {
    console.log(active);

    if (active) {
      //메타마스크와 연결되있으면 바로 main으로
      navigate("/main");
      //deactivate();
      return;
    }

    activate(injected, async (error: Error) => {});
    console.log();
    //onLogin();
    setUserInfo({ address: { account }, isLoggedIn: true });
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Welcome | 여행조각</title>
        </Helmet>
      </HelmetProvider>

      <Content />
      <LoginButton func={handleActivate} />
      <LadingButton />
    </>
  );
}

export default LandingPage;
