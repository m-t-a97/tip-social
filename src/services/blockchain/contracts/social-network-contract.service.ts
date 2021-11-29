import { PostMapper } from "src/models/mappers/post.mapper";
import { Post } from "src/models/post.model";
import { Web3Service } from "../web3.service";

export class SocialNetworkContractService {
  private readonly contract: any;

  constructor(abi: any, address: string) {
    this.contract = new Web3Service.web3Instance.eth.Contract(abi, address);
  }

  public async getName(): Promise<string> {
    return this.contract.methods.name().call();
  }

  public async getPosts(): Promise<Post[]> {
    const postsCount: number = await this.contract.methods
      .postsIdCounter()
      .call();

    const posts: Post[] = [];

    for (let i = 1; i <= postsCount; i++) {
      const postData = await this.contract.methods.posts(i).call();
      posts.push(PostMapper.transform(postData));
    }

    return Promise.resolve(posts);
  }

  public async createPost(content: string, account: string): Promise<any> {
    return this.contract.methods.createPost(content).send({ from: account });
  }

  public async tipPost(id: number, account: string): Promise<any> {
    return this.contract.methods.tipPost(id).send({ from: account });
  }

  public onPostCreated(): any {
    return this.contract.events.PostCreated(
      {},
      function (error: any, event: any) {
        if (error) {
          console.error(event);
          return;
        }

        console.log("[SocialNetworkContractService][onPostCreated]:", event);
      }
    );
  }
}
