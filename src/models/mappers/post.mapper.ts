import { Post } from "../post.model";

export class PostMapper {
  public static transform(data: Record<string, any>): Post {
    return {
      id: parseInt(data.id),
      author: data.author,
      content: data.content,
      tipAmount: parseInt(data.tipAmount),
    };
  }
}
