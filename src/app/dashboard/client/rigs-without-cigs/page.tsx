import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";

import { getUserByEmail } from "@/server/api/users/queries";
import getUserSession from "@/utils/getUserSession";
import isUserEnrolledInProgram from "@/utils/isEnrolledInProgram";

export default async function RigsWithoutCigsPage() {
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
          There was an error fetching your rigs without cigs enrollment.
        </Typography>
      </Box>
    );
  }
  if (user.role !== "client") {
    redirect("/dashboard");
  }

  const enrolledInRigsWithoutCigsProgram = isUserEnrolledInProgram(
    user.programEnrollments,
    "Rigs Without Cigs",
  );

  if (!enrolledInRigsWithoutCigsProgram) {
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
      <Typography>Rigs Without Cigs Page</Typography>
    </Box>
  );
}
