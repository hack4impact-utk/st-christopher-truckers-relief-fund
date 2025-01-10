"use client";

import { Box } from "@mui/material";

import HealthyHabitsTrackingFormList from "@/components/ClientDashboard/HealthyHabits/HealthyHabitsHistory/HealthyHabitsTrackingFormList";
import ModularBarChart from "@/components/ClientDashboard/HealthyHabits/HealthyHabitsHistory/ModularBarChart";
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
        graphLabel="Blood Glucose When Fasting (mg/dL)"
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
        trackingForms={trackingForms.filter(
          (form) => form.systolicBloodPressure && form.diastolicBloodPressure,
        )}
        graphLabel="Systolic"
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
      <HealthyHabitsTrackingFormList trackingForms={trackingForms} />
    </Box>
  );
}
