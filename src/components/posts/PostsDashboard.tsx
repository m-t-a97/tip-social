import styled from "@emotion/styled";

import PostForm from "./PostForm";
import PostsList from "./PostsList";

function PostsDashboard(): JSX.Element {
  return (
    <StyledContainer>
      <StyledTitle>Posts</StyledTitle>
      <PostForm />
      <PostsList />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100%;
  padding: 1rem;
`;

const StyledTitle = styled.h1`
  text-align: center;
`;

export default PostsDashboard;
