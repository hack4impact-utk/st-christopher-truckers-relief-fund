import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import Sidebar from "@/components/AdminDashboard/Sidebar";
import getUserSession from "@/utils/getUserSession";

type AdminDashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
}
