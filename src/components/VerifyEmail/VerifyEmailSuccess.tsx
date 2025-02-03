/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";

import { verifyEmailWithToken } from "@/server/api/users/public-mutations";
import { EmailVerificationToken } from "@/types";

type VerifyEmailSuccessProps = {
  emailVerificationToken: EmailVerificationToken;
};

export default function VerifyEmailSuccess({
  emailVerificationToken,
}: VerifyEmailSuccessProps): ReactNode {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();

  const verifyEmail = async (): Promise<void> => {
    if (!session || session.user.isEmailVerified) {
      return;
    }

    await verifyEmailWithToken(emailVerificationToken.token);
    setSnackbarOpen(true);

    // Update session to reflect database changes
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

  // Call verifyEmail directly when session becomes available
  if (session) {
    void verifyEmail();
  }

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Email verified"
      />
      <Typography variant="body1">Verifying email...</Typography>
    </>
  );
}
