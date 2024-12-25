import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import HealthyHabits from "@/components/ClientDashboard/HealthyHabits";
import getUserSession from "@/utils/getUserSession";

export default async function HealthyHabitsPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        padding: "2.5rem",
      }}
    >
      <HealthyHabits email={session.user.email} />
    </Box>
  );
}
