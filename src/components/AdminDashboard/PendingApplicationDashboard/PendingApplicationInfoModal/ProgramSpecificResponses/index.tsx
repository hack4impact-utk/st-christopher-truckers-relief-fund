import { Box, Typography } from "@mui/material";

import { ProgramSpecificQuestionsSection } from "@/types";

import GetPreventativeScreeningResponses from "./GetPreventativeScreeningResponses";
import HealthyHabitsAndDiabetesPreventionResponses from "./HealthyHabitsAndDiabetesPreventionResponses";
import RigsWithoutCigsResponses from "./RigsWithoutCigsResponses";
import VaccineVoucherResponses from "./VaccineVoucherResponses";

type ProgramSpecificResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function ProgramSpecificResponses({
  programSpecificQuestionsSection,
}: ProgramSpecificResponsesProps) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Program Specific Responses
      </Typography>

      {programSpecificQuestionsSection.hasOptedInToHealthyHabits && (
        <HealthyHabitsAndDiabetesPreventionResponses
          programSpecificQuestionsSection={programSpecificQuestionsSection}
        />
      )}

      {programSpecificQuestionsSection.hasOptedInToRigsWithoutCigs && (
        <RigsWithoutCigsResponses
          programSpecificQuestionsSection={programSpecificQuestionsSection}
        />
      )}

      {programSpecificQuestionsSection.hasOptedInToVaccineVoucher && (
        <VaccineVoucherResponses
          programSpecificQuestionsSection={programSpecificQuestionsSection}
        />
      )}

      {programSpecificQuestionsSection.hasOptedInToGetPreventativeScreenings && (
        <GetPreventativeScreeningResponses
          programSpecificQuestionsSection={programSpecificQuestionsSection}
        />
      )}
    </Box>
  );
}
