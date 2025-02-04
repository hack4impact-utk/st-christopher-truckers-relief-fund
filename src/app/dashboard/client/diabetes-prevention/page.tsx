import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { getUserByEmail } from "@/server/api/users/queries";
import getUserSession from "@/utils/getUserSession";
import isUserEnrolledInProgram from "@/utils/isEnrolledInProgram";

export default async function DiabetesPreventionPage(): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  const [user, error] = await getUserByEmail(session.user.email, {
    populateProgramEnrollments: true,
  });

  if (error !== null) {
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
        <Typography>
          There was an error fetching your diabetes prevention enrollment.
        </Typography>
      </Box>
    );
  }
  if (user.role !== "client") {
    redirect("/dashboard");
  }

  const enrolledInDiabetesPreventionProgram = isUserEnrolledInProgram(
    user.programEnrollments,
    "Diabetes Prevention",
  );

  if (!enrolledInDiabetesPreventionProgram) {
    redirect("/dashboard/client");
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
      <Typography>Diabetes Prevention Page</Typography>
    </Box>
  );
}
