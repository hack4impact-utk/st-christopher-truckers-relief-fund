import { Box, Typography } from "@mui/material";

import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm";

type HealthyHabitsAndDiabetesPreventionResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function HealthyHabitsAndDiabetesPreventionResponses({
  programSpecificQuestionsSection,
}: HealthyHabitsAndDiabetesPreventionResponsesProps) {
  return (
    <Box>
      <Typography variant="h6">
        Healthy Habits and Diabetes Prevention Responses
      </Typography>
    </Box>
  );
}
