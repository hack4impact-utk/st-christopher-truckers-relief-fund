import { Box } from "@mui/material";
import { ReactNode } from "react";

import FormResponse from "@/components/SCFModal/FormResponse";
import FormSection from "@/components/SCFModal/FormSection";
import FormSubsection from "@/components/SCFModal/FormSubsection";
import { ProgramSpecificQuestionsSection } from "@/types";

type VaccineVoucherResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function VaccineVoucherResponses({
  programSpecificQuestionsSection,
}: Readonly<VaccineVoucherResponsesProps>): ReactNode {
  const { vaccineVoucher } = programSpecificQuestionsSection;

  const vaccineResponses = [
    {
      label: "Flu",
      value: vaccineVoucher.vaccines.wantsFluVaccine ? "Yes" : "No",
      isListItem: true,
    },
    {
      label: "Pneumonia",
      value: vaccineVoucher.vaccines.wantsPneumoniaVaccine ? "Yes" : "No",
      isListItem: true,
    },
    {
      label: "Shingles",
      value: vaccineVoucher.vaccines.wantsShinglesVaccine ? "Yes" : "No",
      isListItem: true,
    },
    {
      label: "Covid-19",
      value: vaccineVoucher.vaccines.wantsCovid19Vaccine ? "Yes" : "No",
      isListItem: true,
    },
  ];

  const additionalResponses = [
    {
      label: "Planned location to use the voucher",
      value: vaccineVoucher.voucherLocation || "Not specified",
    },
    {
      label: "Additional Questions/Comments",
      value: vaccineVoucher.additionalQuestions || "None",
    },
  ];

  return (
    <Box mb={2}>
      <FormSection title="Vaccine Voucher Responses">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <FormSubsection title="Vaccines to receive">
              {vaccineResponses.map((response) => (
                <FormResponse
                  key={response.label}
                  label={response.label}
                  value={response.value}
                  isListItem={response.isListItem}
                />
              ))}
            </FormSubsection>
          </Box>

          {additionalResponses.map((response) => (
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
