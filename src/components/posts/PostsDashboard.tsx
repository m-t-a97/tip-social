import styled from "@emotion/styled";

import PostForm from "./PostForm";
import PostsList from "./PostsList";

function PostsDashboard(): JSX.Element {
  const StyledContainer = styled.div`
    height: 100%;
    padding: 1rem;
  `;

  const StyledTitle = styled.h1`
    margin: 0 1rem 1rem 1rem;
    text-align: center;
  `;

  return (
    <StyledContainer>
      <StyledTitle>Posts</StyledTitle>
      <PostForm />
      <PostsList />
    </StyledContainer>
  );
}

export default PostsDashboard;
