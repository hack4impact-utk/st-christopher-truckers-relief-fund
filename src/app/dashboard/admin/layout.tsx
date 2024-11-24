import { Box } from "@mui/material";

import Sidebar from "@/components/AdminDashboard/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
}
