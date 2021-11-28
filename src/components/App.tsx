import { useEffect, useState } from "react";

import _ from "lodash";

import { SmartContractsContextType } from "src/context/blockchain/SmartContractsContextProvider";
import useSmartContracts from "src/hooks/blockchain/useSmartContracts";
import Navbar from "./core/Navbar";

function App() {
  const { socialNetworkContract }: SmartContractsContextType =
    useSmartContracts();

  const [smartContractName, setSmartContractName] = useState("");

  useEffect(() => {
    (async () => {
      const name = await socialNetworkContract.getName();
      setSmartContractName(name);
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        Smart Contract name:
        {!_.isEmpty(smartContractName) && smartContractName}
      </div>
    </div>
  );
}

export default App;
