import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

function useConnect() {
  const { activate, active, account } = useWeb3React();

  const injected = new InjectedConnector({ supportedChainIds: [3] }); // Ropsten 네트워크 설정

  if (active) {
    console.log(`active ${active} / ${address}`);
    login(address);
  }

  if (!active) {
    console.log("trying metamask connect...");

    activate(injected, async () => {});
  }
}

export default useConnect;
