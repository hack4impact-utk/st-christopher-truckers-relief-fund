import { Box } from "@mui/material";

import ProgramSelectionFormSection from "@/components/EnrollmentForm/ProgramSelectionFormSection";

export default function ProgramSelectionPage() {
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
