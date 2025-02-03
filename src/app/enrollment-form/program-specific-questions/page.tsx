import { Box } from "@mui/material";
import { ReactNode } from "react";

import ProgramSpecificQuestionsFormSection from "@/components/EnrollmentForm/ProgramSpecificQuestions/ProgramSpecificQuestionsFormSection";

export default function ProgramSpecificQuestionsPage(): ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "25vh",
      }}
    >
      <ProgramSpecificQuestionsFormSection />
    </Box>
  );
}
