import { useContext } from "react";

import { SmartContractsContext } from "src/context/blockchain/SmartContractsContextProvider";

const useSmartContracts = () => {
  return useContext(SmartContractsContext);
};

export default useSmartContracts;
