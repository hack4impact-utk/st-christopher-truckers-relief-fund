import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import HealthyHabits from "@/components/ClientDashboard/HealthyHabits";
import { getUserByEmail } from "@/server/api/users/queries";
import { ClientUser } from "@/types";
import getUserSession from "@/utils/getUserSession";
import isUserEnrolledInProgram from "@/utils/isEnrolledInProgram";

export default async function HealthyHabitsPage(): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  const [user, error] = await getUserByEmail(session.user.email, {
    populateHealthyHabitsTrackingForms: true,
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
          An error occurred while fetching your healthy habits tracking forms.
        </Typography>
      </Box>
    );
  }

  if (user.role !== "client") {
    redirect("/dashboard");
  }

  const enrolledInHealthyHabitsProgram = isUserEnrolledInProgram(
    user.programEnrollments,
    "Healthy Habits For The Long Haul",
  );

  const enrolledInDiabetesPreventionProgram = isUserEnrolledInProgram(
    user.programEnrollments,
    "Diabetes Prevention",
  );

  const enrolledInHHOrDiabetes =
  enrolledInHealthyHabitsProgram || enrolledInDiabetesPreventionProgram;

  if (!enrolledInHHOrDiabetes) {
    redirect("/dashboard/client");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        padding: 1,
      }}
    >
      <HealthyHabits user={user as ClientUser} />
    </Box>
  );
}
