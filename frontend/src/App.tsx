import styled from "@emotion/styled";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./Router";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: red;
  scroll-behavior: smooth;
`;
function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AppContainer>
      여행조각
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </AppContainer>
  );
}

export default App;
