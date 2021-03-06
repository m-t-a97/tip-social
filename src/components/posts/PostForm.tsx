import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import styled from "@emotion/styled";
import { Button, CircularProgress, TextField, Typography, useTheme } from "@mui/material";
import _ from "lodash";

import { SmartContractsContextType } from "src/context/blockchain/SmartContractsContextProvider";
import { WalletAccountContextType } from "src/context/blockchain/WalletAccountContextProvider";
import useSmartContracts from "src/hooks/blockchain/useSmartContracts";
import useWalletAccount from "src/hooks/blockchain/useWalletAccount";

interface FormInputs {
  content: string;
}

function PostForm(): JSX.Element {
  const theme = useTheme();

  const StyledForm = styled.form`
    width: 100%;
    max-width: ${theme.breakpoints.values.md}px;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const StyledErrorMessage = styled.p`
    margin-bottom: 1rem;
    color: red;
    font-weight: medium;
  `;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const { account }: WalletAccountContextType = useWalletAccount();

  const { socialNetworkContract }: SmartContractsContextType =
    useSmartContracts();

  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function onCreatePost(data: FormInputs): Promise<void> {
    try {
      if (isValid) {
        setErrorMessage("");
        setIsCreatingPost(true);
        await socialNetworkContract.createPost(data.content, account);
        setIsCreatingPost(false);
        reset();
      }
    } catch (error) {
      console.error("[PostForm][onCreatePost]", error);
      setErrorMessage(error.message);
      setIsCreatingPost(false);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onCreatePost)}>
      <Controller
        name="content"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            variant="outlined"
            placeholder="Go on...articulate yourself :)"
            error={_.isEqual(errors?.content, "required")}
            sx={{
              width: "100%",
              fontSize: 16,
              color: "text.primary",
            }}
            {...field}
          />
        )}
      />

      {!_.isEmpty(errorMessage) && (
        <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={isCreatingPost || !isValid}
        sx={{
          width: "100%",
          margin: "1rem 0 0 0",
          fontWeight: 600,
        }}
      >
        {!isCreatingPost && (
          <Typography sx={{ fontWeight: 600 }}>SHARE</Typography>
        )}

        {isCreatingPost && <CircularProgress size={25} />}
      </Button>
    </StyledForm>
  );
}

export default PostForm;
