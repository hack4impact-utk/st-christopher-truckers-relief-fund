import { Box, Typography } from "@mui/material";

import FormResponse from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/FormResponse";
import { ProgramSelectionSection } from "@/types/EnrollmentForm";

type ProgramSelectionResponsesProps = {
  programSelectionSection: ProgramSelectionSection;
};

export default function ProgramSelectionResponses({
  programSelectionSection,
}: ProgramSelectionResponsesProps) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Program Selection Responses
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <FormResponse
          label="Healthy Habits Program"
          value={programSelectionSection.optedInToHealthyHabits ? "Yes" : "No"}
        />
        <FormResponse
          label="Diabetes Prevention Program"
          value={
            programSelectionSection.optedInToDiabetesPrevention ? "Yes" : "No"
          }
        />
        <FormResponse
          label="Rigs Without Cigs Program"
          value={
            programSelectionSection.optedInToRigsWithoutCigs ? "Yes" : "No"
          }
        />
        <FormResponse
          label="Vaccine Voucher Program"
          value={programSelectionSection.optedInToVaccineVoucher ? "Yes" : "No"}
        />
        <FormResponse
          label="Preventative Screenings Program"
          value={
            programSelectionSection.optedInToGetPreventativeScreenings
              ? "Yes"
              : "No"
          }
        />
      </Box>
    </Box>
  );
}
