import { getPendingProgramEnrollments } from "@/server/api/program-enrollments/queries";
import { Box } from "@mui/material";

export default async function ServerComponentTestPage() {
  const pendingProgramEnrollments = await getPendingProgramEnrollments();

  console.log(pendingProgramEnrollments);
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
