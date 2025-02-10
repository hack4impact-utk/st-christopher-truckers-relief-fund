"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import { ClientUser, ScheduledMeeting, UrgentMeetingRequest } from "@/types";

import ScheduledMeetings from "./ScheduledMeetings";
import UrgentMeetingRequests from "./UrgentMeetingRequests";

type NotificationDashboardSections =
  | "urgent-meeting-requests"
  | "scheduled-meetings";

type NotificationsDashboardProps = {
  urgentMeetingRequests: UrgentMeetingRequest[];
  scheduledMeetings: ScheduledMeeting[];
  allClients: ClientUser[];
};

export default function NotificationsDashboard({
  urgentMeetingRequests,
  scheduledMeetings,
  allClients,
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
      case "scheduled-meetings":
        return (
          <ScheduledMeetings
            scheduledMeetings={scheduledMeetings}
            allClients={allClients}
          />
        );
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
          <Tab label="Scheduled Meetings" value="scheduled-meetings" />
        </Tabs>
      </Box>
      <Box sx={{ marginTop: 3, width: "100%" }}>
        {getSectionContent(selectedSection)}
      </Box>
    </Box>
  );
}
