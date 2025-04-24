import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import DiabetesPreventionDashboard from "@/components/AdminDashboard/DiabetesPreventionDashboard";
import { getDiabetesPreventionProgramEnrollments } from "@/server/api/program-enrollments/queries";

export const dynamic = "force-dynamic";

export default async function DiabetesPrevention(): Promise<ReactNode> {
  const [diabetesPreventionProgramEnrollments, error] =
    await getDiabetesPreventionProgramEnrollments();

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
        <Typography>There was an error fetching Diabetes Prevention</Typography>
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
      <DiabetesPreventionDashboard
        diabetesPreventionProgramEnrollments={
          diabetesPreventionProgramEnrollments
        }
      />
    </Box>
  );
}
