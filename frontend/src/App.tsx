import styled from "@emotion/styled";
import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./Router";

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
