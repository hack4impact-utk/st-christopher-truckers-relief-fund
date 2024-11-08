import { Box } from "@mui/material";

import ProgramSpecificQuestionsFormSection from "@/components/EnrollmentForm/ProgramSpecificQuestions/ProgramSpecificQuestionsFormSection";

export default function ProgramSpecificQuestionsPage() {
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
