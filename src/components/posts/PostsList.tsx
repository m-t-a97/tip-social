import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "@emotion/styled";

import { SmartContractsContextType } from "src/context/blockchain/SmartContractsContextProvider";
import useSmartContracts from "src/hooks/blockchain/useSmartContracts";
import { Post } from "src/models/post.model";
import { updatePosts } from "../../store/features/posts/postsSlice";
import PostsListCard from "./PostsListCard";

function PostsList(): JSX.Element {
  const dispatch = useDispatch();

  const { socialNetworkContract }: SmartContractsContextType =
    useSmartContracts();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isNewPostCreated, setIsNewPostCreated] = useState<boolean>(false);
  let onPostCreatedSubscription: any;

  useEffect(() => {
    async function fetchPosts(): Promise<void> {
      setIsNewPostCreated(false);
      const posts = await socialNetworkContract.getPosts();
      setPosts(posts);
      dispatch(updatePosts(posts));
    }

    fetchPosts();
    onPostCreated();

    return onPostCreatedSubscription;
  }, [isNewPostCreated]);

  async function onPostCreated() {
    onPostCreatedSubscription = socialNetworkContract
      .onPostCreated()
      .on("data", (event: any) => {
        setIsNewPostCreated(true);
      });
  }

  return (
    <StyledContainer>
      <StyledPostsContainer>
        {posts.map((post: Post) => (
          <PostsListCard key={post.id} post={post} />
        ))}
      </StyledPostsContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 768px;
  margin: auto;
`;

const StyledPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

export default PostsList;
