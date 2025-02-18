"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { ProgramEnrollment } from "@/types";

type HealthyHabitsMetricsProps = {
  HealthyHabitsProgramEnrollments: ProgramEnrollment[];
};

export default function HealthyHabitsMetrics({
  HealthyHabitsProgramEnrollments,
}: HealthyHabitsMetricsProps): ReactNode {
  const totalEnrolled = HealthyHabitsProgramEnrollments.length;
  const totalActive = 50;
  const registrationsInPast3Months = 20;

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
        Metrics
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography>
          <strong>Total Erolled:</strong> {totalEnrolled}
        </Typography>
        <Typography>
          <strong>Total Active:</strong> {totalActive}
        </Typography>
        <Typography>
          <strong>Registrations in Past 3 Months:</strong>{" "}
          {registrationsInPast3Months}
        </Typography>
      </Box>
    </Box>
  );
}
