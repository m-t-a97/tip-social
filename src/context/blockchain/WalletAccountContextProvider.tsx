import { createContext, useEffect, useState } from "react";

import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import _ from "lodash";
import { interval, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import Web3 from "web3";

import { Web3Service } from "src/services/blockchain/web3.service";

export type WalletAccountContextType = {
  account: string;
};

export const WalletAccountContext =
  createContext<WalletAccountContextType>(null);

let account_$: Subscription;

function WalletAccountContextProvider({ children }): JSX.Element {
  const [account, setAccount] = useState<string>(null);

  const value: WalletAccountContextType = {
    account,
  };

  useEffect(() => {
    async function initialiseWallet(): Promise<void> {
      try {
        const web3: Web3 = Web3Service.web3Instance;

        account_$ = interval(1000)
          .pipe(
            tap(async () => {
              const accounts: string[] = await web3.eth.getAccounts();

              if (!_.isEqual(account, accounts[0])) {
                setAccount(accounts[0]);
              }
            })
          )
          .subscribe();
      } catch (error) {
        console.error("[WalletAccountContextProvider][useEffect]:", error);
      }
    }

    initialiseWallet();

    return () => {
      account_$?.unsubscribe();
    };
  }, [account]);

  return !_.isNil(account) ? (
    <WalletAccountContext.Provider value={value}>
      {children}
    </WalletAccountContext.Provider>
  ) : (
    <StyledContainer>
      <CircularProgress />
      <p>Connecting to wallet...</p>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default WalletAccountContextProvider;
