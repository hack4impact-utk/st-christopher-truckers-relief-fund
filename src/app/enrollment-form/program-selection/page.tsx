import { Box } from "@mui/material";
import { ReactNode } from "react";

import ProgramSelectionFormSection from "@/components/EnrollmentForm/ProgramSelectionFormSection";

export default function ProgramSelectionPage(): ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "25vh",
      }}
    >
      <ProgramSelectionFormSection />
    </Box>
  );
}
