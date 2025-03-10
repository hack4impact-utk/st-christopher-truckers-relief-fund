/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { ReactNode } from "react";

import { verifyEmailWithToken } from "@/server/api/users/public-mutations";
import { EmailVerificationToken } from "@/types";

type VerifyEmailSuccessProps = {
  emailVerificationToken: EmailVerificationToken;
};

export default function VerifyEmailSuccess({
  emailVerificationToken,
}: Readonly<VerifyEmailSuccessProps>): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { data: session, update } = useSession();

  const verifyEmail = async (): Promise<void> => {
    if (!session) {
      return;
    }

    if (session.user.isEmailVerified) {
      router.push("/");
      return;
    }

    await verifyEmailWithToken(emailVerificationToken.token);
    enqueueSnackbar("Email verified");

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

  return <Typography variant="body1">Verifying email...</Typography>;
}
