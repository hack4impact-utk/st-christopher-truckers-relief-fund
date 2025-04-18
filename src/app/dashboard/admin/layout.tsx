import { Box } from "@mui/material";
import { ReactNode } from "react";

import Sidebar from "@/components/AdminDashboard/Sidebar";

type AdminDashboardLayoutProps = {
  children: React.ReactNode;
};

export default function AdminDashboardLayout({
  children,
}: Readonly<AdminDashboardLayoutProps>): ReactNode {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
}
