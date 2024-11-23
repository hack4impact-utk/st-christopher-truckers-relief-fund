/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

import { verifyEmailWithToken } from "@/server/api/users/mutations";
import { EmailVerificationToken } from "@/types";

type VerifyEmailSuccessProps = {
  emailVerificationToken: EmailVerificationToken;
};

export default function VerifyEmailSuccess({
  emailVerificationToken,
}: VerifyEmailSuccessProps) {
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      await verifyEmailWithToken(emailVerificationToken.token);
      await signOut();
      router.push("/");
    };

    void verifyEmail();
  }, []);

  return <Typography variant="body1">Verifying email...</Typography>;
}
