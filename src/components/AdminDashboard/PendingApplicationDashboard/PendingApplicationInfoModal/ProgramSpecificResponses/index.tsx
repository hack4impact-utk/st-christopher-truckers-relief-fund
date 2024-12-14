import { Box, Typography } from "@mui/material";

import GetPreventativeScreeningResponses from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/ProgramSpecificResponses/GetPreventativeScreeningResponses";
import HealthyHabitsAndDiabetesPreventionResponses from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/ProgramSpecificResponses/HealthyHabitsAndDiabetesPreventionResponses";
import RigsWithoutCigsResponses from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/ProgramSpecificResponses/RigsWithoutCigsResponses";
import VaccineVoucherResponses from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/ProgramSpecificResponses/VaccineVoucherResponses";
import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm";

type ProgramSpecificResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function ProgramSpecificResponses({
  programSpecificQuestionsSection,
}: ProgramSpecificResponsesProps) {
  return (
    <Box>
      <Typography variant="h5">Program Specific Responses</Typography>

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
