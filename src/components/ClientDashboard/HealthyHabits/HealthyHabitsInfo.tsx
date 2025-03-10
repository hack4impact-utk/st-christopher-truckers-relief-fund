import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { ClientUser } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type HealthyHabitsInfoProps = {
  user: ClientUser;
};

export default function HealthyHabitsInfo({
  user,
}: Readonly<HealthyHabitsInfoProps>): ReactNode {
  const healthyHabitsEnrolledDate = user.programEnrollments.find(
    (enrollment) => enrollment.program === "Healthy Habits For The Long Haul",
  )?.dateEnrolled;

  const diabetesPreventionEnrolledDate = user.programEnrollments.find(
    (enrollment) => enrollment.program === "Diabetes Prevention",
  )?.dateEnrolled;

  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        boxShadow: 3,
        borderRadius: 2,
        padding: 4,
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Info
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {healthyHabitsEnrolledDate && (
          <Typography>
            <strong>Healthy Habits For The Long Haul:</strong> Started on{" "}
            {dayjsUtil(healthyHabitsEnrolledDate).format("MM/DD/YYYY")}
          </Typography>
        )}
        {diabetesPreventionEnrolledDate && (
          <Typography>
            <strong>Diabetes Prevention:</strong> Started on{" "}
            {dayjsUtil(diabetesPreventionEnrolledDate).format("MM/DD/YYYY")}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
