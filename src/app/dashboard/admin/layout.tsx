import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import Sidebar from "@/components/AdminDashboard/Sidebar";
import { getNumberOfUrgentMeetingRequests } from "@/server/api/urgent-meeting-requests/queries";
import getUserSession from "@/utils/getUserSession";

type AdminDashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminDashboardLayout({
  children,
}: Readonly<AdminDashboardLayoutProps>): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const numberOfUrgentMeetingRequests =
    await getNumberOfUrgentMeetingRequests();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar numberOfUrgentMeetingRequests={numberOfUrgentMeetingRequests} />
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
}
