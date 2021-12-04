import { useContext } from "react";

import { WalletAccountContext } from "src/context/blockchain/WalletAccountContextProvider";

function useWalletAccount() {
  return useContext(WalletAccountContext);
}

export default useWalletAccount;
