import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import UpdateClientInformation from "@/components/ClientDashboard/UpdateClientInformation";
import getUserSession from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

export default async function UpdateInformationPage(): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  const user = session.user;

  if (user.role !== "client") {
    redirect("/dashboard");
  }

  if (!user.needsInformationUpdated) {
    redirect("/dashboard");
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "25vh",
      }}
    >
      <UpdateClientInformation />
    </Box>
  );
}
