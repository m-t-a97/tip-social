import { Web3Service } from "../web3.service";

export class SocialNetworkContractService {
  private readonly contract: any;

  constructor(abi: any, address: string) {
    this.contract = new Web3Service.web3Instance.eth.Contract(abi, address);
  }

  public async getName(): Promise<string> {
    return this.contract.methods.name().call();
  }

  public async createPost(content: string, account: string): Promise<any> {
    return this.contract.methods.createPost(content).send({ from: account });
  }

  public async tipPost(id: number, account: string): Promise<any> {
    return this.contract.methods.tipPost(id).send({ from: account });
  }
}
