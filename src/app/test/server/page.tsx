import { Box } from "@mui/material";
import { ReactNode } from "react";

import ScreeningRequestManagementTable from "@/components/AdminDashboard/GetPreventativeScreeningDashboard/ScreeningRequestManagementTable";
import { getAllScreeningRequests } from "@/server/api/screening-requests.ts/queries";

export default async function ServerComponentTestPage(): Promise<ReactNode> {
  const [screeningRequests, error] = await getAllScreeningRequests();

  if (error !== null) {
    return <>{error}</>;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScreeningRequestManagementTable screeningRequests={screeningRequests} />
    </Box>
  );
}
