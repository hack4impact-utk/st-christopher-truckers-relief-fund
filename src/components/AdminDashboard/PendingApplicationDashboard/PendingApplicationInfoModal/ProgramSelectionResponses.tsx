/* eslint-disable simple-import-sort/imports */
import { ProgramSelectionSection } from "@/types/EnrollmentForm";
import { Box, Typography } from "@mui/material";

type ProgramSelectionResponsesProps = {
  programSelectionSection: ProgramSelectionSection;
};

export default function ProgramSelectionResponses({
  programSelectionSection,
}: ProgramSelectionResponsesProps) {
  return (
    <Box>
      <Typography variant="h5">Program Selection Responses</Typography>
    </Box>
  );
}
