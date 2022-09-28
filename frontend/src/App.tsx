import styled from "@emotion/styled";
import React, { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./Router";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.mainDark};
  scroll-behavior: smooth;
`;
function App() {
  const [queryClient] = useState(() => new QueryClient());
  // 새로고침 막기 변수
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      console.log("첫렌더링");

      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      console.log("새로고침 막아");

      window.removeEventListener("beforeunload", preventClose);
    };
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
