/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import { verifyEmailWithToken } from "@/server/api/users/public-mutations";
import { EmailVerificationToken } from "@/types";

type VerifyEmailSuccessProps = {
  emailVerificationToken: EmailVerificationToken;
};

export default function VerifyEmailSuccess({
  emailVerificationToken,
}: VerifyEmailSuccessProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      await verifyEmailWithToken(emailVerificationToken.token);
      setSnackbarOpen(true);
      setTimeout(async () => {
        await signOut({ redirect: false, callbackUrl: "/" });
        router.push("/");
      }, 1000);
    };

    void verifyEmail();
  }, []);

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Email verified"
      />
      <Typography variant="body1">Verifying email...</Typography>;
    </>
  );
}
