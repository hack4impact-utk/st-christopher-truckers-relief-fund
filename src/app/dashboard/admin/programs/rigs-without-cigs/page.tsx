import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import RigsWithoutCigsDashboard from "@/components/AdminDashboard/RigsWithoutCigsDashboard";
import { getRigsWithoutCigsProgramEnrollments } from "@/server/api/program-enrollments/queries";

export default async function RigsWithoutCigsProgramPage(): Promise<ReactNode> {
  const [rigsWithoutCigsProgramEnrollments, error] =
    await getRigsWithoutCigsProgramEnrollments();

  if (error !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          There was an error fetching Rigs Without Cigs program enrollments
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        padding: 4,
      }}
    >
      <RigsWithoutCigsDashboard
        rigsWithoutCigsProgramEnrollments={rigsWithoutCigsProgramEnrollments}
      />
    </Box>
  );
}
