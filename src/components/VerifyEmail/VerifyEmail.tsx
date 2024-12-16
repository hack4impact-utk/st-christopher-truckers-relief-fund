"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Snackbar, Typography } from "@mui/material";
import { useState } from "react";

import { handleEmailVerificationTokenRequest } from "@/server/api/email-verification-tokens/public-mutations";

type VerifyEmailProps = {
  email: string;
};

export default function VerifyEmail({ email }: VerifyEmailProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await handleEmailVerificationTokenRequest(email);
    setSnackbarOpen(true);

    setIsLoading(false);
    setDisabled(true);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Email verification email sent"
      />
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="body1">
          Please verify your email address by clicking on the link in the email
          we sent you.
        </Typography>
        <Typography variant="body1">
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
    </>
  );
}
