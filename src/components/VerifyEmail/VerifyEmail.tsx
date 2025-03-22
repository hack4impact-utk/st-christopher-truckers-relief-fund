"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";

import { handleEmailVerificationTokenRequest } from "@/server/api/email-verification-tokens/public-mutations";

type VerifyEmailProps = {
  email: string;
};

export default function VerifyEmail({
  email,
}: Readonly<VerifyEmailProps>): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async (): Promise<void> => {
    setIsLoading(true);
    await handleEmailVerificationTokenRequest(email);

    enqueueSnackbar("Email verification email sent", { variant: "success" });

    setIsLoading(false);
    setDisabled(true);
  };

  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography>
        Please verify your email address by clicking on the link in the email we
        sent you.
      </Typography>
      <Typography>
        To resend the verification email, click on the button below.
      </Typography>
      <LoadingButton
        loading={isLoading}
        disabled={disabled}
        onClick={async () => await handleClick()}
        variant="contained"
        color="primary"
      >
        Resend Verification Email
      </LoadingButton>
    </Box>
  );
}
