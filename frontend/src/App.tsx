import styled from "@emotion/styled";
import React, { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./Router";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.mainDark};
  scroll-behavior: smooth;
`;
function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AppContainer>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router />
        </Suspense>
      </QueryClientProvider>
    </AppContainer>
  );
}

export default App;
