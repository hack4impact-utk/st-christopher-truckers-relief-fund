import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import ClientProfile from "@/components/Profile/ClientProfile";
import SignOutButton from "@/components/Profile/SignOutButton";
import { getUserByEmail } from "@/server/api/users/queries";
import getUserSession from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

export default async function ClientProfilePage(): Promise<ReactNode> {
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
        <Typography>There was an error loading the profile.</Typography>
        <SignOutButton />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        maxWidth: "100%",
        marginTop: "150px",
        marginInline: "auto",
      }}
    >
      <ClientProfile user={userWithProgramEnrollments} />
    </Box>
  );
}
