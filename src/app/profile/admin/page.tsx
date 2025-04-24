import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import AdminProfile from "@/components/Profile/AdminProfile";
import getUserSession from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage(): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const { user } = session;

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <AdminProfile user={user} />
    </Box>
  );
}
