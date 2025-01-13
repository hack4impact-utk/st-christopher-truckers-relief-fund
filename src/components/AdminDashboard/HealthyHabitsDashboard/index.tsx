"use client";

import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import HealthyHabitsClientDashboard from "@/components/AdminDashboard/HealthyHabitsDashboard/HealthyHabitsClientDashboard";
import HealthyHabitsMetrics from "@/components/AdminDashboard/HealthyHabitsDashboard/HealthyHabitsMetrics";

type HealthyHabitsSections = "clients" | "metrics";

export default function HealthyHabitsDashboard() {
  const [selectedSection, setSelectedSection] =
    useState<HealthyHabitsSections>("clients");

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: HealthyHabitsSections,
  ) => {
    setSelectedSection(newValue);
  };

  function getSectionContent(section: HealthyHabitsSections) {
    console.log("here");

    switch (section) {
      case "clients":
        return <HealthyHabitsClientDashboard />;
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
