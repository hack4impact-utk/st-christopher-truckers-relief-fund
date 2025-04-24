import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import ChangePasswordForm from "@/components/ChangePassword/ChangePasswordForm";
import getUserSession from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

export default async function ForgotPasswordPage(): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ChangePasswordForm
        firstName={session.user.firstName}
        email={session.user.email}
      />
    </Box>
  );
}
