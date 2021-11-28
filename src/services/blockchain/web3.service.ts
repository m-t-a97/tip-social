import _ from "lodash";
import Web3 from "web3";

export class Web3Service {
  public static web3Instance: Web3;

  public static async getWeb3(): Promise<Web3> {
    return new Promise(async (resolve, reject) => {
      try {
        const currentWindow = window as any;

        let web3: Web3;

        // If Web3 has been injected by the browser (MetaMask)
        if (!_.isNil(currentWindow.ethereum)) {
          await currentWindow.ethereum.request({
            method: "eth_requestAccounts",
          });

          // Use MetaMask's provider
          web3 = new Web3(currentWindow.ethereum);
          resolve(web3);
        } else if (!_.isNil(currentWindow.web3)) {
          web3 = currentWindow.web3;
          resolve(web3);
        } else {
          resolve(
            new Web3(
              new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_WEB3_HOST)
            )
          );
        }

        Web3Service.web3Instance = web3;
      } catch (error) {
        console.error("[Web3Service][getWeb3]: ❌", error);

        reject(error);
      }
    });
  }
}
