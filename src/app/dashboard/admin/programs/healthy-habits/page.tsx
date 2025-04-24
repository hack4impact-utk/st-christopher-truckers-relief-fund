import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import HealthyHabitsDashboard from "@/components/AdminDashboard/HealthyHabitsDashboard";
import { getHealthyHabitsProgramEnrollments } from "@/server/api/program-enrollments/queries";

export const dynamic = "force-dynamic";

export default async function HealthyHabits(): Promise<ReactNode> {
  const [healthyHabitsProgramEnrollments, error] =
    await getHealthyHabitsProgramEnrollments();

  if (error !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>There was an error fetching Healthy Habits</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        padding: 4,
      }}
    >
      <HealthyHabitsDashboard
        healthyHabitsProgramEnrollments={healthyHabitsProgramEnrollments}
      />
    </Box>
  );
}
