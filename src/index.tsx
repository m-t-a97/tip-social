import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./components/App";

import Web3ContextProvider from "./context/blockchain/Web3ContextProvider";
import WalletAccountContextProvider from "./context/blockchain/WalletAccountContextProvider";
import SmartContractsContextProvider from "./context/blockchain/SmartContractsContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <Web3ContextProvider>
      <WalletAccountContextProvider>
        <SmartContractsContextProvider>
          <App />
        </SmartContractsContextProvider>
      </WalletAccountContextProvider>
    </Web3ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
