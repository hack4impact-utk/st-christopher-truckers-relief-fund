import { Box, Typography } from "@mui/material";

import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm";

type VaccineVoucherResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function VaccineVoucherResponses({
  programSpecificQuestionsSection,
}: VaccineVoucherResponsesProps) {
  return (
    <Box>
      <Typography variant="h6">Vaccine Voucher Responses</Typography>
    </Box>
  );
}
