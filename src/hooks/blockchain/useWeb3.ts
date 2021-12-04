import { useContext } from "react";

import { Web3Context } from "src/context/blockchain/Web3ContextProvider";

function useWeb3() {
  return useContext(Web3Context);
}

export default useWeb3;
