import { Box } from "@mui/material";
import { ReactNode } from "react";

import FormResponse from "@/components/SCFModal/FormResponse";
import FormSection from "@/components/SCFModal/FormSection";
import { ProgramSelectionSection } from "@/types";

type ProgramSelectionResponsesProps = {
  programSelectionSection: ProgramSelectionSection;
};

export default function ProgramSelectionResponses({
  programSelectionSection,
}: Readonly<ProgramSelectionResponsesProps>): ReactNode {
  const programSelectionResponses = [
    {
      label: "Healthy Habits Program",
      value: programSelectionSection.optedInToHealthyHabits ? "Yes" : "No",
    },
    {
      label: "Diabetes Prevention Program",
      value: programSelectionSection.optedInToDiabetesPrevention ? "Yes" : "No",
    },
    {
      label: "Rigs Without Cigs Program",
      value: programSelectionSection.optedInToRigsWithoutCigs ? "Yes" : "No",
    },
    {
      label: "Vaccine Voucher Program",
      value: programSelectionSection.optedInToVaccineVoucher ? "Yes" : "No",
    },
    {
      label: "Preventative Screenings Program",
      value: programSelectionSection.optedInToGetPreventativeScreenings
        ? "Yes"
        : "No",
    },
  ];
  return (
    <Box>
      <FormSection title="Program Selection Responses">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {programSelectionResponses.map((response) => (
            <FormResponse
              key={response.label}
              label={response.label}
              value={response.value}
            />
          ))}
        </Box>
      </FormSection>
    </Box>
  );
}
