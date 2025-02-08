"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import { UrgentMeetingRequest } from "@/types";

import RecurringMeetings from "./RecurringMeetings";
import UrgentMeetingRequests from "./UrgentMeetingRequests";

type NotificationDashboardSections =
  | "urgent-meeting-requests"
  | "recurring-meetings";

type NotificationsDashboardProps = {
  urgentMeetingRequests: UrgentMeetingRequest[];
};

export default function NotificationsDashboard({
  urgentMeetingRequests,
}: NotificationsDashboardProps): ReactNode {
  const [selectedSection, setSelectedSection] =
    useState<NotificationDashboardSections>("urgent-meeting-requests");

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: NotificationDashboardSections,
  ): void => {
    setSelectedSection(newValue);
  };

  function getSectionContent(
    section: NotificationDashboardSections,
  ): ReactNode {
    switch (section) {
      case "urgent-meeting-requests":
        return (
          <UrgentMeetingRequests
            urgentMeetingRequests={urgentMeetingRequests}
          />
        );
      case "recurring-meetings":
        return <RecurringMeetings />;
      default:
        return <Typography>Invalid section</Typography>;
    }
  }

  return (
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
          <Tab
            label="Urgent Meeting Requests"
            value="urgent-meeting-requests"
          />
          <Tab label="Recurring Meetings" value="recurring-meetings" />
        </Tabs>
      </Box>
      <Box sx={{ marginTop: 3, width: "100%" }}>
        {getSectionContent(selectedSection)}
      </Box>
    </Box>
  );
}
