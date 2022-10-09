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

  // 새로고침 막기 변수

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
