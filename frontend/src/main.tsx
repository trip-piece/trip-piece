import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import App from "./App";
import GlobalStyle from "./style/GlobalStyle";
import theme, { themes } from "./style/theme";
import { worker } from "./mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <RecoilRoot>
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={themes}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  </RecoilRoot>,
  // </React.StrictMode>,
);
