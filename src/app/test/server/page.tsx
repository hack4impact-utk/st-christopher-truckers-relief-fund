import { Box } from "@mui/material";

import { getPendingProgramEnrollments } from "@/server/api/program-enrollments/queries";

export default async function ServerComponentTestPage() {
  const pendingProgramEnrollments = await getPendingProgramEnrollments();

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
      {JSON.stringify(pendingProgramEnrollments)}
    </Box>
  );
}
