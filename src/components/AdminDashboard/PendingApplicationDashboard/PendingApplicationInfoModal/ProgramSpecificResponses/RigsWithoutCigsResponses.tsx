import { Box, Typography } from "@mui/material";

import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm";

type RigsWithoutCigsResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function RigsWithoutCigsResponses({
  programSpecificQuestionsSection,
}: RigsWithoutCigsResponsesProps) {
  return (
    <Box>
      <Typography variant="h6">Rigs Without Cigs Responses</Typography>
    </Box>
  );
}
