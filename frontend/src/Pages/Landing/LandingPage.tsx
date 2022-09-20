import React from "react";
import styled from "@emotion/styled";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { setCookie } from "../../utils/cookie";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

import LoginButton from "./LoginButton";
import LadingButton from "./LandingButton";
import Text from "./Text";

import fetchData from "../../utils/apis/api";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

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
  const onLogin = async () => {
    try {
      const response = await fetchData.post({
        url: "user/login",
        body: { account: { account } },
      });

      if (response.status === 200) {
        setCookie("accessToken", response.data.accessToken);
        setCookie("refreshToken", response.data.refreshToken);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleActivate = () => {
    if (active) {
      deactivate();
      return;
    }

    activate(injected, async (error: Error) => {});
    onLogin();
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Welcome | 여행조각</title>
        </Helmet>
      </HelmetProvider>

      <Text />
      <LoginButton func={handleActivate} />
      <LadingButton />
    </>
  );
}

export default LandingPage;
