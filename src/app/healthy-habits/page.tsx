import { Box } from "@mui/material";

import HealthyHabitsForm from "@/components/HealthyHabitsForm";

export default function HealthyHabits() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "25vh",
      }}
    >
      <HealthyHabitsForm />
    </Box>
  );
}
