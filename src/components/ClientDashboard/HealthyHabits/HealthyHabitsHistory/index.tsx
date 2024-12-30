"use client";

import { Box } from "@mui/material";

import ModularLineChart from "@/components/ClientDashboard/HealthyHabits/HealthyHabitsHistory/ModularLineChart";
import { HealthyHabitsTrackingForm } from "@/types";

type HealthyHabitsHistoryProps = {
  trackingForms: HealthyHabitsTrackingForm[];
};

export default function HealthyHabitsHistory({
  trackingForms,
}: HealthyHabitsHistoryProps) {
  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <ModularLineChart
        trackingForms={trackingForms.filter((form) => form.weight)}
        graphLabel="Weight (lbs)"
        dataKey="weight"
        title="Weight"
      />
      <ModularLineChart
        trackingForms={trackingForms.filter((form) => form.bloodGlucose)}
        graphLabel="Blood Glucose(when fasting) (mg/dL)"
        dataKey="bloodGlucose"
        title="Blood Glucose"
      />

      <ModularLineChart
        trackingForms={trackingForms.filter((form) => form.a1c)}
        graphLabel="A1C (%)"
        dataKey="a1c"
        title="A1C"
      />

      <ModularLineChart
        trackingForms={trackingForms.filter((form) => form.cholesterol)}
        graphLabel="Cholesterol (mg/dL)"
        dataKey="cholesterol"
        title="Cholesterol"
      />

      <ModularLineChart
        trackingForms={trackingForms.filter((form) => form.bloodPressure)}
        graphLabel="Blood Pressure (mmHg)"
        dataKey="bloodPressure"
        title="Blood Pressure"
      />
    </Box>
  );
}
