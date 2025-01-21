"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

import HealthyHabitsClientDashboard from "@/components/AdminDashboard/HealthyHabitsDashboard/HealthyHabitsClientDashboard";
import HealthyHabitsMetrics from "@/components/AdminDashboard/HealthyHabitsDashboard/HealthyHabitsMetrics";
import { ProgramEnrollment } from "@/types";

type HealthyHabitsSections = "clients" | "metrics";

type HealthyHabitsDashboardProps = {
  healthyHabitsProgramEnrollments: ProgramEnrollment[];
};

export default function HealthyHabitsDashboard({
  healthyHabitsProgramEnrollments,
}: HealthyHabitsDashboardProps) {
  const [selectedSection, setSelectedSection] =
    useState<HealthyHabitsSections>("clients");

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: HealthyHabitsSections,
  ) => {
    setSelectedSection(newValue);
  };

  function getSectionContent(section: HealthyHabitsSections) {
    switch (section) {
      case "clients":
        return (
          <HealthyHabitsClientDashboard
            healthyHabitsProgramEnrollments={healthyHabitsProgramEnrollments}
          />
        );
      case "metrics":
        return <HealthyHabitsMetrics />;
      default:
        return <Typography>Invalid section</Typography>;
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            alignSelf: "flex-start",
          }}
        >
          <Tabs
            value={selectedSection}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Clients" value="clients" />
            <Tab label="Metrics" value="metrics" />
          </Tabs>
        </Box>
        <Box sx={{ marginTop: 3, width: "100%" }}>
          {getSectionContent(selectedSection)}
        </Box>
      </Box>
    </>
  );
}
