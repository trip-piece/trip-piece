import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { motion } from "framer-motion";
import { NavigateFunction, useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
import { useRecoilState } from "recoil";
import Web3 from "web3";
import { setCookie } from "../../utils/cookie";
// import { IUserInfo, UserInfoState } from "../../store/atom";
import { pixelToRem } from "../../utils/functions/util";
import LoginButton from "./LoginButton";
import Content from "./Text";
import LandingPageImg from "./LandingPageImg";
import userApis, { walletAddress } from "../../utils/apis/userApis";
import axiosInstance from "../../utils/apis/api";
import { IUserInfo, UserInfoState } from "../../store/atom";

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
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

const DivContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  vertical-align: center;
  justify-content: center;
  align-items: center;

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
  const { activate, active, account } = useWeb3React();
  const navigate = useNavigate();
  const address: walletAddress = { walletAddress: account };

  const [userInfoState, setUserInfoState] = useRecoilState(UserInfoState);

  const loginFlag: boolean = false;

  console.log(`지갑.. ${account}`);

  let userInfoInit: IUserInfo = {
    address: "",
    nickname: "",
    balance: "-1",
    isLoggedIn: false,
    id: -1,
    tripCount: 0,
    diaryCount: 0,
  };

  const getUserBalance = () => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(import.meta.env.VITE_WEB3_URL),
    );

    if (account) {
      const address_temp = account;

      web3.eth
        .getBalance(address_temp)
        .then((balance) => {
          return web3.utils.fromWei(balance, "ether");
        })
        .then((eth) => {
          userInfoInit = { ...userInfoInit, balance: eth };
          setUserInfoState(userInfoInit);

          moveToMain(navigate);
        });
    }
  };
  const getUserInfo = (token: string | number | boolean) => {
    axiosInstance
      .get(userApis.getUser, { headers: { ACCESS_TOKEN: token } })
      .then(
        (response: {
          data: {
            userId: number;
            walletAddress: string;
            nickname: string;
            tripCount: number;
            diaryCount: number;
          };
        }) => {
          userInfoInit = {
            address: response.data.walletAddress,
            nickname: response.data.nickname,
            balance: "-1.0",
            isLoggedIn: true,
            id: response.data.userId,
            tripCount: response.data.tripCount,
            diaryCount: response.data.diaryCount,
          };

          setUserInfoState(userInfoInit);

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

          getUserInfo(response.data.accessToken);
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

  const handleActivate = async (event: Event) => {
    event.preventDefault();

    if (active) {
      console.log(`active ${active} / ${address}`);
      login(address);
    }

    if (!active) {
      console.log("trying metamask connect...");

      activate(injected, async () => {});
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
