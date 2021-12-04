import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "@emotion/styled";
import { useTheme } from "@mui/material";

import { SmartContractsContextType } from "src/context/blockchain/SmartContractsContextProvider";
import useSmartContracts from "src/hooks/blockchain/useSmartContracts";
import { Post } from "src/models/post.model";
import { updatePosts } from "../../store/features/posts/postsSlice";
import PostsListCard from "./PostsListCard";

function PostsList(): JSX.Element {
  const theme = useTheme();

  const StyledContainer = styled.div`
    height: 100%;
    width: 100%;
    max-width: ${theme.breakpoints.values.md}px;
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

  const dispatch = useDispatch();

  const { socialNetworkContract }: SmartContractsContextType =
    useSmartContracts();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isNewPostCreated, setIsNewPostCreated] = useState<boolean>(false);
  const [isPostTipped, setIsPostTipped] = useState<boolean>(false);
  let onPostCreated_$: any;

  useEffect(() => {
    async function fetchPosts(): Promise<void> {
      setIsNewPostCreated(false);
      setIsPostTipped(false);
      const posts = await socialNetworkContract.getPosts();
      setPosts(() => {
        const sortedPosts = [
          ...posts.sort((a, b) => b.tipAmount - a.tipAmount),
        ];
        return sortedPosts;
      });
      dispatch(updatePosts(posts));
    }

    fetchPosts();
    onPostCreated();

    return () => {
      onPostCreated_$?.unsubscribe();
    };
  }, [isNewPostCreated, isPostTipped]);

  async function onPostCreated() {
    onPostCreated_$ = socialNetworkContract
      .onPostCreated()
      .on("data", (event: any) => {
        setIsNewPostCreated(true);
      });
  }

  function setPostIsTipped(): void {
    setIsPostTipped(true);
  }

  return (
    <StyledContainer>
      <StyledPostsContainer>
        {posts.map((post: Post) => (
          <PostsListCard
            key={post.id}
            post={post}
            setPostIsTipped={setPostIsTipped}
          />
        ))}
      </StyledPostsContainer>
    </StyledContainer>
  );
}

export default PostsList;
