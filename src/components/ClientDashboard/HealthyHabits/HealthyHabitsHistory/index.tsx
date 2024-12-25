"use client";

import { Box } from "@mui/material";

import WeightLineChart from "@/components/ClientDashboard/HealthyHabits/HealthyHabitsHistory/WeightLineChart";
import { HealthyHabitsTrackingForm } from "@/types";

type HealthyHabitsHistoryProps = {
  trackingForms: HealthyHabitsTrackingForm[];
};

export default function HealthyHabitsHistory({
  trackingForms,
}: HealthyHabitsHistoryProps) {
  // place weight line chart using flex wrap
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
      <WeightLineChart trackingForms={trackingForms} />
      <WeightLineChart trackingForms={trackingForms} />
      <WeightLineChart trackingForms={trackingForms} />
      <WeightLineChart trackingForms={trackingForms} />
      <WeightLineChart trackingForms={trackingForms} />
    </Box>
  );
}
