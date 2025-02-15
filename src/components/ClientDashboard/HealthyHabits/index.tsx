"use client";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";

import { ClientUser, HealthyHabitsTrackingForm } from "@/types";

import HealthyHabitsHistory from "./HealthyHabitsHistory";
import HealthyHabitsInfo from "./HealthyHabitsInfo";
import HealthyHabitsTracking from "./HealthyHabitsTracking";

type HealthyHabitsSections = "tracking" | "history" | "info";

type HealthyHabitsProps = {
  user: ClientUser;
};

export default function HealthyHabits({ user }: HealthyHabitsProps): ReactNode {
  const [selectedSection, setSelectedSection] =
    useState<HealthyHabitsSections>("tracking");

  const [trackingForms, setTrackingForms] = useState<
    HealthyHabitsTrackingForm[]
  >(user.healthyHabitsTrackingForms);

  const handleTabChange = (
    _event: SyntheticEvent,
    newValue: HealthyHabitsSections,
  ): void => {
    setSelectedSection(newValue);
  };

  function getSectionContent(section: HealthyHabitsSections): ReactNode {
    switch (section) {
      case "tracking":
        return (
          <HealthyHabitsTracking
            user={user}
            trackingForms={trackingForms}
            setTrackingForms={setTrackingForms}
          />
        );
      case "history":
        return (
          <HealthyHabitsHistory
            trackingForms={trackingForms}
            setTrackingForms={setTrackingForms}
            user={user}
          />
        );
      case "info":
        return <HealthyHabitsInfo user={user} />;
      default:
        return <Typography>Invalid section</Typography>;
    }
  }

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
        <Box sx={{ width: "min(90vw, 700px)", marginBottom: 2 }}>
          <Typography sx={{ fontSize: "1.5rem", textAlign: "center" }}>
            Healthy Habits & Diabetes Prevention Dashboard
          </Typography>
        </Box>
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
      <Box sx={{ marginTop: 3 }}>{getSectionContent(selectedSection)}</Box>
    </>
  );
}
