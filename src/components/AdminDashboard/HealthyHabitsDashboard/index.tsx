"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

import HealthyHabitsClientDashboard from "@/components/AdminDashboard/HealthyHabitsDashboard/HealthyHabitsClientDashboard";
import HealthyHabitsMetrics from "@/components/AdminDashboard/HealthyHabitsDashboard/HealthyHabitsMetrics";
import { ProgramEnrollment } from "@/types";

type HealthyHabitsSections = "clients" | "metrics";

type HealthyHabitsDashboardProps = {
  healthHabitsProgramEnrollments: ProgramEnrollment[];
};

export default function HealthyHabitsDashboard({
  healthHabitsProgramEnrollments,
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
            healthHabitsProgramEnrollments={healthHabitsProgramEnrollments}
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
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          width: "95%",
          height: "75%",
          marginTop: "100px",
        }}
      >
        <Box
          sx={{
            width: "100%",
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
        <Box sx={{ marginTop: 3 }}>{getSectionContent(selectedSection)}</Box>
      </Box>
    </>
  );
}
