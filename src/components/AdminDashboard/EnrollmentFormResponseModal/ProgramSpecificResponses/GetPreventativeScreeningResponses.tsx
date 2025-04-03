import { Box } from "@mui/material";
import { ReactNode } from "react";

import FormResponse from "@/components/SCFModal/FormResponse";
import FormSection from "@/components/SCFModal/FormSection";
import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm";

type GetPreventativeScreeningResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function GetPreventativeScreeningResponses({
  programSpecificQuestionsSection,
}: Readonly<GetPreventativeScreeningResponsesProps>): ReactNode {
  const getPreventativeScreeningsResponses = [
    {
      label: "Agree to Provide Screening Results",
      value: programSpecificQuestionsSection.getPreventativeScreenings
        .agreeToShareResults
        ? "Yes"
        : "No",
    },
    {
      label: "Agree to Get Account Registered",
      value: programSpecificQuestionsSection.getPreventativeScreenings
        .prostateScreening.agreeToGetAccountRegistered
        ? "Yes"
        : "No",
    },
    {
      label: "Agree to Prostate Screening",
      value: programSpecificQuestionsSection.getPreventativeScreenings
        .prostateScreening.agreesToProstateScreening
        ? "Yes"
        : "No",
    },
    {
      label: "Not Applicable",
      value: programSpecificQuestionsSection.getPreventativeScreenings
        .prostateScreening.isNotApplicable
        ? "Yes"
        : "No",
    },
    {
      label: "Additional Questions/Comments",
      value:
        programSpecificQuestionsSection.getPreventativeScreenings
          .prostateScreening.additionalQuestions || "None",
    },
  ];
  return (
    <Box mb={2}>
      <FormSection title="Get Preventative Screenings Responses">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {getPreventativeScreeningsResponses.map((response) => (
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
