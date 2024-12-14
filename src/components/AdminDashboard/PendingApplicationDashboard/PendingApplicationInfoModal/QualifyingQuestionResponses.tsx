import { Box, Typography } from "@mui/material";

import { QualifyingQuestionsSection } from "@/types/EnrollmentForm";

type QualifyingQuestionResponsesProps = {
  qualifyingQuestionsSection: QualifyingQuestionsSection;
};

export default function QualifyingQuestionResponses({
  qualifyingQuestionsSection,
}: QualifyingQuestionResponsesProps) {
  return (
    <Box>
      <Typography variant="h5">Qualifying Question Responses</Typography>
    </Box>
  );
}
