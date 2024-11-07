import { Box } from "@mui/material";

import QualifyingQuestionsFormSection from "@/components/EnrollmentForm/QualifyingQuestionsFormSection";

export default function QualifyingQuestionsPage() {
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
