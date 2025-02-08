import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import ClientSettings from "@/components/Settings/ClientSettings";
import SignOutButton from "@/components/Settings/SignOutButton";
import { getUserByEmail } from "@/server/api/users/queries";
import getUserSession from "@/utils/getUserSession";

export default async function AdminSettingsPage(): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session || session.user.role !== "client") {
    redirect("/");
  }

  const { user } = session;

  const [userWithProgramEnrollments, error] = await getUserByEmail(user.email, {
    populateProgramEnrollments: true,
  });

  if (error !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography>There was an error loading the settings.</Typography>
        <SignOutButton />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <ClientSettings user={userWithProgramEnrollments} />
    </Box>
  );
}
