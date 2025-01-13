import HealthyHabitsDashboard from "@/components/AdminDashboard/HealthyHabitsDashboard";
import { Box } from "@mui/material";

export default function HealthyHabits() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HealthyHabitsDashboard />
    </Box>
  );
}
