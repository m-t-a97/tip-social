import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";

import App from "./components/App";
import SmartContractsContextProvider from "./context/blockchain/SmartContractsContextProvider";
import WalletAccountContextProvider from "./context/blockchain/WalletAccountContextProvider";
import Web3ContextProvider from "./context/blockchain/Web3ContextProvider";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ContextProvider>
        <WalletAccountContextProvider>
          <SmartContractsContextProvider>
            <App />
          </SmartContractsContextProvider>
        </WalletAccountContextProvider>
      </Web3ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
