/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  const { data: session, update } = useSession();

  useEffect(() => {
    const verifyEmail = async () => {
      // wait for session to be loaded
      if (!session) {
        return;
      }

      // calling update will trigger the useEffect again
      // this prevents a loop
      if (session.user.isEmailVerified) {
        return;
      }

      await verifyEmailWithToken(emailVerificationToken.token);
      setSnackbarOpen(true);

      // update session object to reflect database changes
      await update({
        ...session,
        user: {
          ...session?.user,
          isEmailVerified: true,
        },
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    };

    void verifyEmail();
  }, [session]);

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
