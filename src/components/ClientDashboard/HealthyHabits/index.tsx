"use client";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

import HealthyHabitsHistory from "@/components/ClientDashboard/HealthyHabits/HealthyHabitsHistory";
import HealthyHabitsInfo from "@/components/ClientDashboard/HealthyHabits/HealthyHabitsInfo";
import HealthyHabitsTracking from "@/components/ClientDashboard/HealthyHabits/HealthyHabitsTracking";
import { HealthyHabitsTrackingForm } from "@/types";

export type HealthyHabitsSections = "tracking" | "history" | "info";

function getSectionContent(
  section: HealthyHabitsSections,
  email: string,
  trackingForms: HealthyHabitsTrackingForm[],
) {
  switch (section) {
    case "tracking":
      return <HealthyHabitsTracking email={email} />;
    case "history":
      return <HealthyHabitsHistory trackingForms={trackingForms} />;
    case "info":
      return <HealthyHabitsInfo />;
    default:
      return <Typography>Invalid section</Typography>;
  }
}

type HealthyHabitsProps = {
  email: string;
  trackingForms: HealthyHabitsTrackingForm[];
};

export default function HealthyHabits({
  email,
  trackingForms,
}: HealthyHabitsProps) {
  const [selectedSection, setSelectedSection] =
    useState<HealthyHabitsSections>("tracking");

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: HealthyHabitsSections,
  ) => {
    setSelectedSection(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", marginBottom: 2 }}>
          Healthy Habits Dashboard
        </Typography>
        <Tabs
          value={selectedSection}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Track" value="tracking" />
          <Tab label="History" value="history" />
          <Tab label="Info" value="info" />
        </Tabs>
      </Box>
      <Divider sx={{ width: "80vw", marginTop: 2 }} />
      <Box sx={{ marginTop: 3 }}>
        {getSectionContent(selectedSection, email, trackingForms)}
      </Box>
    </>
  );
}
