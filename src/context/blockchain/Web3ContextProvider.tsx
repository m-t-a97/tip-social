import { createContext, useEffect, useState } from "react";

import styled from "@emotion/styled";
import { CircularProgress, Button } from "@mui/material";
import Web3 from "web3";

import { Web3Service } from "../../services/blockchain/web3.service";

export type Web3ContextType = {
  web3: Web3;
};

export const Web3Context = createContext<Web3ContextType>(null);

function Web3ContextProvider({ children }): JSX.Element {
  const [web3, setWeb3] = useState<Web3>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorEncountered, setIsErrorEncountered] = useState<boolean>(false);

  const value: Web3ContextType = {
    web3,
  };

  useEffect(() => {
    initialiseWeb3();
  }, []);

  async function initialiseWeb3(): Promise<void> {
    try {
      setIsLoading(true);
      setIsErrorEncountered(false);
      const newWeb3 = await Web3Service.getWeb3();
      setWeb3(newWeb3);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsErrorEncountered(true);

      console.error("[Web3ContextProvider][initalise]", error);
    }
  }

  async function onConnectWallet(): Promise<void> {
    await initialiseWeb3();
  }

  return (
    <>
      {isLoading && (
        <StyledContainer>
          <CircularProgress />
        </StyledContainer>
      )}

      {!isLoading && isErrorEncountered && (
        <StyledContainer>
          <Button variant="contained" onClick={onConnectWallet}>
            Connect
          </Button>
        </StyledContainer>
      )}

      {!isLoading && !isErrorEncountered && (
        <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
      )}
    </>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Web3ContextProvider;
