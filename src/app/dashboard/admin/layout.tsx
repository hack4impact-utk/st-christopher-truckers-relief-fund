import Sidebar from "@/components/AdminDashboard/Navbar";
import { Box } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
}
