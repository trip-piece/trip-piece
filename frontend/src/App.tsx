import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Web3 from "web3";

import Router from "./Router";
import { IUserInfo, UserInfoState } from "./store/atom";
import axiosInstance from "./utils/apis/api";
import userApis from "./utils/apis/userApis";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.mainDark};
  scroll-behavior: smooth;
`;
function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            // suspense: true,
          },
        },
      }),
  );

  const [userInfoState, setUserInfoState] = useRecoilState(UserInfoState);
  const { activate, active, account, deactivate } = useWeb3React();
  // 새로고침 막기 변수

  let userInfoInit: IUserInfo;

  const getUserBalance = () => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(import.meta.env.VITE_WEB3_URL),
    );

    if (account) {
      web3.eth
        .getBalance(account)
        .then((balance) => {
          return web3.utils.fromWei(balance, "ether");
        })
        .then((eth) => {
          setUserInfoState({ ...userInfoInit, balance: eth });
          console.log(userInfoInit.nickname);
        });
    }
  };

  const getUserInfo = async () => {
    await axiosInstance.get(userApis.getUser).then(
      (response: {
        data: {
          userId: number;
          walletAddress: string;
          nickname: string;
          tripCount: number;
          diaryCount: number;
        };
      }) => {
        setUserInfoState({
          ...userInfoState,
          address: response.data.walletAddress,
          nickname: response.data.nickname,
          balance: "0.0",
          isLoggedIn: true,
          id: response.data.userId,
          tripCount: response.data.tripCount,
          diaryCount: response.data.diaryCount,
        });

        getUserBalance();
      },
    );
  };

  // 컴포넌트 렌더링 될 때마다 실행
  // useEffect(() => {
  //   if (userInfoState.isLoggedIn) {
  //     console.log("새로고침 테스트1");

  //     getUserInfo();
  //   }
  // }, []);

  // const validateActiveMetamask = () => {
  //   const injected = new InjectedConnector({});
  //   if (!active) {
  //     activate(injected, async () => {});
  //     getUserInfo;
  //   }
  // };

  // Component가 Update 되었을 때(props, state 변경)
  //const mounted = useRef(false);
  // useEffect(() => {
  //   if (!userInfoState.isLoggedIn) {
  //     console.log("새로고침 테스트 2");
  //     validateActiveMetamask;
  //   }
  // }, [userInfoState.isLoggedIn]);

  return (
    <AppContainer>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContainer>
  );
}

export default App;
