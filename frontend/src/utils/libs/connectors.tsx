import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({ supportedChainIds: [] });
const { activate, deactivate, active, account } = useWeb3React();

//지갑연결
const onClickActivate = () => {
  if (active) {
    deactivate();
    return;
  }

  activate(injected, async (error: Error) => {
    /*에러처리코드 */
  });
};

const onClickDeactivate = () => {
  deactivate();
};
