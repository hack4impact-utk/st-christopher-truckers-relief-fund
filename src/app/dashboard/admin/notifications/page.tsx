import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import NotificationsDashboard from "@/components/AdminDashboard/NotificationsDashboard";
import { getAllUrgentMeetingRequests } from "@/server/api/urgent-meeting-requests/queries";

export default async function AdminNotificationsPage(): Promise<ReactNode> {
  const [urgentMeetingRequests, error] = await getAllUrgentMeetingRequests();

  if (error !== null) {
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
      <NotificationsDashboard urgentMeetingRequests={urgentMeetingRequests} />
    </Box>
  );
}
