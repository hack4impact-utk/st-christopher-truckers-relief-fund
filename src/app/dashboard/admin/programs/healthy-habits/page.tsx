import { Box, Typography } from "@mui/material";

import HealthyHabitsDashboard from "@/components/AdminDashboard/HealthyHabitsDashboard";
import { getHealthHabitsProgramEnrollments } from "@/server/api/program-enrollments/queries";

export default async function HealthyHabits() {
  const [healthHabitsProgramEnrollments, error] =
    await getHealthHabitsProgramEnrollments();

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
        <Typography>There was an error fetching Health Habits</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HealthyHabitsDashboard
        healthHabitsProgramEnrollments={healthHabitsProgramEnrollments}
      />
    </Box>
  );
}
