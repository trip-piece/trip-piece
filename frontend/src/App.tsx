import styled from "@emotion/styled";
import { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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
  // 새로고침 막기 변수

  let userInfoInit: IUserInfo;

  const getUserBalance = (account: string) => {
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
        userInfoInit = {
          address: response.data.walletAddress,
          nickname: response.data.nickname,
          balance: "-1.0",
          isLoggedIn: true,
          id: response.data.userId,
          tripCount: response.data.tripCount,
          diaryCount: response.data.diaryCount,
        };
        console.log("실행");

        setUserInfoState(userInfoInit);
        console.log(`유저정보 가져오기 ${userInfoInit.nickname}`);

        getUserBalance(response.data.walletAddress);
      },
    );
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      getUserInfo();
    })();
  }, []);

  return (
    <AppContainer>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContainer>
  );
}

export default App;
