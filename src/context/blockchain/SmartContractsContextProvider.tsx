import { createContext, useEffect, useState } from "react";

import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import _ from "lodash";

import { SocialNetworkContractService } from "src/services/blockchain/contracts/social-network-contract.service";
import { Web3Service } from "src/services/blockchain/web3.service";
import socialNetworkContractAsJson from "../../blockchain/build/contracts/SocialNetwork.json";

export type SmartContractsContextType = {
  socialNetworkContract: SocialNetworkContractService;
};

export const SmartContractsContext =
  createContext<SmartContractsContextType>(null);

function SmartContractsContextProvider({ children }): JSX.Element {
  const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `;

  const StyledErrorMessage = styled.p`
    margin: 0;
    color: red;
    font-size: 16px;
    text-align: center;
  `;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSmartContractsInitialised, setIsSmartContractsInitialised] =
    useState<boolean>(false);
  const [smartContractsContextTypeValue, setSmartContractsContextTypeValue] =
    useState<SmartContractsContextType>(null);

  useEffect(() => {
    async function initialiseContracts(): Promise<void> {
      setIsLoading(true);
      setErrorMessage("");
      setIsSmartContractsInitialised(false);

      const networkId = await Web3Service.web3Instance.eth.net.getId();
      const networkData = socialNetworkContractAsJson.networks[networkId];

      if (!_.isNil(networkData)) {
        setSmartContractsContextTypeValue({
          socialNetworkContract: new SocialNetworkContractService(
            socialNetworkContractAsJson.abi as any,
            networkData.address
          ),
        });

        setIsSmartContractsInitialised(true);
      } else {
        setErrorMessage(
          `The Social Network Smart Contract is not deployed on this network. 
          Please change to a network that has the smart contract deployed.`
        );
      }

      setIsLoading(false);
    }

    initialiseContracts();
  }, []);

  return (
    <>
      {isLoading && (
        <StyledContainer>
          <CircularProgress />
        </StyledContainer>
      )}

      {!isLoading && !_.isEmpty(errorMessage) && (
        <StyledContainer>
          <div>
            <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
          </div>
        </StyledContainer>
      )}

      {!isLoading && _.isEmpty(errorMessage) && isSmartContractsInitialised && (
        <SmartContractsContext.Provider value={smartContractsContextTypeValue}>
          {children}
        </SmartContractsContext.Provider>
      )}
    </>
  );
}

export default SmartContractsContextProvider;
