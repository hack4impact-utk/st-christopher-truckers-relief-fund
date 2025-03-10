"use client";

import { Box, Typography } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

import { ClientUser, HealthyHabitsTrackingForm } from "@/types";

import HealthyHabitsTrackingFormList from "./HealthyHabitsTrackingFormList";
import ModularBarChart from "./ModularBarChart";
import ModularLineChart from "./ModularLineChart";

type HealthyHabitsHistoryProps = {
  trackingForms: HealthyHabitsTrackingForm[];
  setTrackingForms: Dispatch<SetStateAction<HealthyHabitsTrackingForm[]>>;
  user: ClientUser;
};

export default function HealthyHabitsHistory({
  trackingForms,
  setTrackingForms,
  user,
}: Readonly<HealthyHabitsHistoryProps>): ReactNode {
  if (trackingForms.length === 0) {
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
        <Typography>No forms submitted yet.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
      }}
    >
      <ModularLineChart
        type="one-line"
        trackingForms={trackingForms}
        primaryLabel="Weight (lbs)"
        dataKey="weight"
        title="Weight"
      />
      <ModularLineChart
        type="one-line"
        trackingForms={trackingForms}
        primaryLabel="Blood Glucose When Fasting (mg/dL)"
        dataKey="bloodGlucose"
        title="Blood Glucose"
      />

      <ModularLineChart
        type="one-line"
        trackingForms={trackingForms}
        primaryLabel="A1C (%)"
        dataKey="a1c"
        title="A1C"
      />

      <ModularLineChart
        type="one-line"
        trackingForms={trackingForms}
        primaryLabel="Cholesterol (mg/dL)"
        dataKey="cholesterol"
        title="Cholesterol"
      />

      <ModularLineChart
        type="two-line"
        trackingForms={trackingForms}
        primaryLabel="Systolic"
        secondaryLabel="Diastolic"
        dataKey="systolicBloodPressure"
        dataKey2="diastolicBloodPressure"
        title="Blood Pressure (mmHg)"
      />

      <ModularBarChart
        trackingForms={trackingForms.filter((form) => form.movementMinutes)}
        graphLabel="Movement Minutes"
        dataKey="movementMinutes"
        title="Movement Minutes"
      />

      <ModularBarChart
        trackingForms={trackingForms.filter((form) => form.sleepRanking)}
        graphLabel="Sleep Quality"
        dataKey="sleepRanking"
        title="Sleep Quality"
      />

      <ModularBarChart
        trackingForms={trackingForms.filter((form) => form.energyRanking)}
        graphLabel="Energy Level"
        dataKey="energyRanking"
        title="Energy Level"
      />

      <ModularBarChart
        trackingForms={trackingForms.filter(
          (form) => form.emotionalHealthRanking,
        )}
        graphLabel="Emotional Health"
        dataKey="emotionalHealthRanking"
        title="Emotional Health"
      />
      <HealthyHabitsTrackingFormList
        trackingForms={trackingForms}
        setTrackingForms={setTrackingForms}
        user={user}
      />
    </Box>
  );
}
