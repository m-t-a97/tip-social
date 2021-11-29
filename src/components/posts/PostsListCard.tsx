import styled from "@emotion/styled";
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { DateTime } from "luxon";

import { Post } from "src/models/post.model";
import SvgTooltipIcon from "../shared/SvgTooltipIcon";

interface PostsListCardProps {
  post: Post;
}

function PostsListCard({ post }: PostsListCardProps): JSX.Element {
  return (
    <StyledContainer>
      <Card sx={{ width: "100%" }} elevation={2}>
        <CardHeader
          avatar={<SvgTooltipIcon data={post.author} size={40} />}
          title={post.author}
          subheader={DateTime.local().toISO()}
        />

        <CardContent>
          <Typography sx={{ fontSize: 14 }}>{post.content}</Typography>
        </CardContent>

        <CardActions
          sx={{
            padding: "0.5rem 1rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Tip Amount: {post.tipAmount.toString()}</Typography>

          <Button type="button" size="small" variant="outlined">
            TIP 0.1 ETH
          </Button>
        </CardActions>
      </Card>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;

  .MuiCardHeader-title {
    width: 100%;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 768px) {
      font-size: 16px;
    }
  }
`;

export default PostsListCard;
