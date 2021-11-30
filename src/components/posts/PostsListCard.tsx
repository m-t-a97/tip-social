import { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { Button, Card, CardActions, CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import _ from "lodash";

import { SmartContractsContextType } from "src/context/blockchain/SmartContractsContextProvider";
import { WalletAccountContextType } from "src/context/blockchain/WalletAccountContextProvider";
import useSmartContracts from "src/hooks/blockchain/useSmartContracts";
import useWalletAccount from "src/hooks/blockchain/useWalletAccount";
import { Post } from "src/models/post.model";
import { Web3Service } from "src/services/blockchain/web3.service";
import SvgTooltipIcon from "../shared/SvgTooltipIcon";

interface PostsListCardProps {
  post: Post;
  setPostIsTipped: () => any;
}

function PostsListCard({
  post,
  setPostIsTipped,
}: PostsListCardProps): JSX.Element {
  const theme = useTheme();

  const { account }: WalletAccountContextType = useWalletAccount();
  const { socialNetworkContract }: SmartContractsContextType =
    useSmartContracts();

  const StyledContainer = styled.div`
    width: 100%;

    .MuiCardHeader-title {
      width: 90%;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${theme.palette.text.primary};

      @media (min-width: ${theme.breakpoints.values.sm}px) {
        font-size: 16px;
      }
    }

    .MuiCardHeader-subheader {
      color: ${theme.palette.text.secondary};
      font-size: 14px;
      font-weight: 600;
    }
  `;

  const [isTippingPost, setIsTippingPost] = useState<boolean>(false);

  useEffect(() => {
    onPostTipped();
  }, []);

  async function onTipPost(): Promise<void> {
    try {
      setIsTippingPost(true);
      await socialNetworkContract.tipPost(post.id, account);
      setIsTippingPost(false);
    } catch (error) {
      console.error("[PostsListCard][onTipPost]", error);
      setIsTippingPost(false);
    }
  }

  async function onPostTipped(): Promise<void> {
    try {
      await socialNetworkContract.onPostTipped().on("data", (event: any) => {
        setPostIsTipped();
      });
    } catch (error) {
      console.error("[PostsListCard][onPostTipped]", error);
    }
  }

  return (
    <StyledContainer>
      <Card sx={{ width: "100%" }} elevation={2}>
        <CardHeader
          avatar={<SvgTooltipIcon data={post.author} size={40} />}
          title={post.author}
        />

        <CardContent>
          <Typography
            sx={{ fontSize: 16, color: "text.primary", fontWeight: "bold" }}
          >
            {post.content}
          </Typography>
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
          <Typography
            sx={{
              fontSize: 14,
              color: "text.secondary",
              fontWeight: "bold",
            }}
          >
            Tip Amount:{" "}
            {Web3Service.web3Instance.utils.fromWei(
              post.tipAmount.toString(),
              "ether"
            )}
          </Typography>

          {!_.isEqual(account, post.author) && (
            <Button
              type="button"
              size="small"
              variant="outlined"
              disabled={isTippingPost}
              onClick={onTipPost}
            >
              TIP 0.1 ETH
            </Button>
          )}
        </CardActions>
      </Card>
    </StyledContainer>
  );
}

export default PostsListCard;
