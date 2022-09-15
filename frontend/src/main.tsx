import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { RecoilRoot } from "recoil";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";
import GlobalStyle from "./style/GlobalStyle";
import theme from "./style/theme";
import { worker } from "./mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <GlobalStyle />
        <App />
      </StyledEngineProvider>
    </ThemeProvider>
  </RecoilRoot>,
  // </React.StrictMode>,
);
