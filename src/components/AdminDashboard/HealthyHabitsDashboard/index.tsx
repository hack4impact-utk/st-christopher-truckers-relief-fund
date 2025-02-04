"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import { ProgramEnrollment } from "@/types";

import HealthyHabitsClientDashboard from "./HealthyHabitsClientDashboard";
import HealthyHabitsMetrics from "./HealthyHabitsMetrics";

type HealthyHabitsSections = "clients" | "metrics";

type HealthyHabitsDashboardProps = {
  healthyHabitsProgramEnrollments: ProgramEnrollment[];
};

export default function HealthyHabitsDashboard({
  healthyHabitsProgramEnrollments,
}: HealthyHabitsDashboardProps): ReactNode {
  const [selectedSection, setSelectedSection] =
    useState<HealthyHabitsSections>("clients");

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: HealthyHabitsSections,
  ): void => {
    setSelectedSection(newValue);
  };

  function getSectionContent(section: HealthyHabitsSections): ReactNode {
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
