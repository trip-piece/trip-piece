import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { HelmetProvider } from "react-helmet-async";
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import App from "./App";
import GlobalStyle from "./style/GlobalStyle";
import theme, { themes } from "./style/theme";
import { worker } from "./mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Web3ReactProvider getLibrary={getLibrary}>
    <RecoilRoot>
      <HelmetProvider>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={themes}>
              <GlobalStyle />
              <App />
            </ThemeProvider>
          </MuiThemeProvider>
        </StyledEngineProvider>
      </HelmetProvider>
    </RecoilRoot>
  </Web3ReactProvider>,
  // </React.StrictMode>,
);
