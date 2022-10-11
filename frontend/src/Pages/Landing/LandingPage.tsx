import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
import { useRecoilState } from "recoil";
import Web3 from "web3";
import { getCookie, setCookie } from "../../utils/cookie";
// import { IUserInfo, UserInfoState } from "../../store/atom";
import { pixelToRem } from "../../utils/functions/util";
import LoginButton from "./LoginButton";
import Content from "./Text";
import LandingPageImg from "./LandingPageImg";
import userApis, { Idata } from "../../utils/apis/userApis";
import axiosInstance from "../../utils/apis/api";
import { isLoggedinState, UserInfoState } from "../../store/atom";

const injected = new InjectedConnector({ supportedChainIds: [5] });
// const injected = new InjectedConnector({});
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  max-width: 550px;
  min-width: 320px;
`;

const DivContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  vertical-align: center;
  justify-content: center;
  align-items: center;
  max-width: 550px;
  min-width: 320px;

  .aroundButton {
    outline: none;
    border: none;
    border-radius: 20px;
    background-color: transparent;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;
    width: ${pixelToRem(171)};
    height: ${pixelToRem(38)};
    font-size: ${(props) => props.theme.fontSizes.h5};
    margin-top: 80%;
    color: ${(props) => props.theme.colors.white};
    z-index: 1;
    cursor: pointer;
  }
`;

export default function LandingPage() {
  const { activate, active, account, deactivate } = useWeb3React();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedinState);

  // console.log(active);

  // console.log(`첫 렌더링: 지갑.. ${account}`);
  const moveToMain = () => {
    navigate("/main");
  };

  function login(data: Idata) {
    //  console.log("jwt 로그인");

    // const moveToMain = () => {
    //   navigate("/main");
    // };
    axiosInstance
      .post(userApis.login, data)
      .then(
        (response: { data: { accessToken: string; refreshToken: string } }) => {
          setCookie("accessToken", response.data.accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: true,
          });
          setCookie("refreshToken", response.data.refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: true,
          });
          setIsLoggedIn(true);
          moveToMain();
        },
      );
  }

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else if (!getCookie("accessToken") && account.length !== 0) {
      const data: Idata = { walletAddress: account };
      login(data);
    }
  }, [account]);

  // 메타마스크 연결확인
  const handleActivate = async (event: Event) => {
    event.preventDefault();

    if (active) {
      if (account.length !== 0) {
        // console.log("메타마스크 연결되있는데 지갑길이 받아온 상태");
        moveToMain();
        // login({ walletAddress: account });
      } else {
        // console.log("메타마스크 연결되있는데 지갑 안받아온 상태");
        // console.log("연결끊기");

        deactivate();
        //  console.log("재연결");

        activate(injected, async () => {});
      }
    } else {
      // console.log("연결안되있어서 연결하자 !");

      //  console.log(`active ${active}`);

      activate(injected, async () => {
        return Error;
      }).catch((error) => {
        //  console.log("activate 에러메시지");
        //  console.log(error);
      });
    }
  };

  const testRef = useRef(null);
  const scrollToElement = () =>
    testRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <Container>
      <Helmet>
        <title>Welcome | 여행조각</title>
      </Helmet>
      <DivContainer>
        <Content />
        <LoginButton func={handleActivate} />
        <div
          style={{
            textAlign: "center",
          }}
        >
          <motion.div
            animate={{ scale: [1.2, 1, 1.2, 1, 1.2] }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="aroundButton"
            onClick={scrollToElement}
          >
            👇 둘러보기 👇
          </motion.div>
        </div>
        {/* <LandingButton /> */}
      </DivContainer>
      <div ref={testRef}>
        <LandingPageImg />
      </div>
    </Container>
  );
}
