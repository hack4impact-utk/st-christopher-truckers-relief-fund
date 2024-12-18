import { Box, Typography } from "@mui/material";

import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm";

type GetPreventativeScreeningResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function GetPreventativeScreeningResponses({
  programSpecificQuestionsSection,
}: GetPreventativeScreeningResponsesProps) {
  return (
    <Box>
      <Typography variant="h6">Get Preventative Screening Responses</Typography>
    </Box>
  );
}
