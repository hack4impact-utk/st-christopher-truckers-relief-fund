import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import NotificationsDashboard from "@/components/AdminDashboard/NotificationsDashboard";
import { getAllScheduledMeetings } from "@/server/api/scheduled-meetings/queries";
import { getAllUrgentMeetingRequests } from "@/server/api/urgent-meeting-requests/queries";
import { getClients } from "@/server/api/users/queries";

export default async function AdminNotificationsPage(): Promise<ReactNode> {
  const [urgentMeetingRequests, urgentMeetingsError] =
    await getAllUrgentMeetingRequests();

  const [scheduledMeetings, scheduledMeetingsError] =
    await getAllScheduledMeetings();

  const [allClients, allClientsError] = await getClients();

  if (urgentMeetingsError !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          An error occurred while fetching your urgent meeting requests.
        </Typography>
      </Box>
    );
  }

  if (scheduledMeetingsError !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          An error occurred while fetching your scheduled meetings.
        </Typography>
      </Box>
    );
  }

  if (allClientsError !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>An error occurred while fetching your clients.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        padding: 4,
      }}
    >
      <NotificationsDashboard
        urgentMeetingRequests={urgentMeetingRequests}
        scheduledMeetings={scheduledMeetings}
        allClients={allClients}
      />
    </Box>
  );
}
