import { Box } from "@mui/material";
import { ReactNode } from "react";

import QualifyingQuestionsFormSection from "@/components/EnrollmentForm/QualifyingQuestionsFormSection";

export default function QualifyingQuestionsPage(): ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "25vh",
      }}
    >
      <QualifyingQuestionsFormSection />
    </Box>
  );
}
