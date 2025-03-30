import { Box } from "@mui/material";
import { ReactNode } from "react";

import FormResponse from "@/components/SCFModal/FormResponse";
import FormSection from "@/components/SCFModal/FormSection";
import FormSubsection from "@/components/SCFModal/FormSubsection";
import { QualifyingQuestionsSection } from "@/types";

type QualifyingQuestionResponsesProps = {
  qualifyingQuestionsSection: QualifyingQuestionsSection;
};

export default function QualifyingQuestionResponses({
  qualifyingQuestionsSection,
}: Readonly<QualifyingQuestionResponsesProps>): ReactNode {
  const { diagnoses } = qualifyingQuestionsSection;

  const diagnosesResponses = [
    {
      label: "Type 1 Diabetes",
      value: diagnoses.hasType1Diabetes ? "Yes" : "No",
    },
    {
      label: "Type 2 Diabetes",
      value: diagnoses.hasType2Diabetes ? "Yes" : "No",
    },
    {
      label: "High Blood Pressure",
      value: diagnoses.hasHighBloodPressure ? "Yes" : "No",
    },
    {
      label: "High Cholesterol",
      value: diagnoses.hasHighCholesterol ? "Yes" : "No",
    },
    {
      label: "Heart Disease",
      value: diagnoses.hasHeartDisease ? "Yes" : "No",
    },
    {
      label: "Obesity",
      value: diagnoses.isObese ? "Yes" : "No",
    },
    {
      label: "Other",
      value: diagnoses.hasOther ? "Yes" : "No",
    },
    {
      label: "None of the Above",
      value: diagnoses.noneOfTheAbove ? "Yes" : "No",
    },
  ];

  const additionalQuestionsResponses = [
    {
      label: "Tobacco User",
      value: qualifyingQuestionsSection.isTobaccoUser ? "Yes" : "No",
    },
    {
      label: "Applied for Financial Assistance",
      value: qualifyingQuestionsSection.hasAppliedForFinancialAssistance
        ? "Yes"
        : "No",
    },
    {
      label: "Health Condition Caused by Tobacco Use",
      value: qualifyingQuestionsSection.hasHealthConditionCausedByTobaccoUse
        ? "Yes"
        : "No",
    },
    {
      label: "Health Insurance",
      value: qualifyingQuestionsSection.hasHealthInsurance ? "Yes" : "No",
    },
    {
      label: "Close Family History of Prostate Cancer",
      value: qualifyingQuestionsSection.hasCloseFamilyHistoryOfProstateCancer
        ? "Yes"
        : "No",
    },
  ];

  return (
    <Box>
      <FormSection title="Qualifying Questions">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormSubsection title="Diagnoses">
            {diagnosesResponses.map((response) => (
              <FormResponse
                key={response.label}
                label={response.label}
                value={response.value}
                isListItem
              />
            ))}
          </FormSubsection>

          <FormSubsection title="Additional Questions">
            {additionalQuestionsResponses.map((response) => (
              <FormResponse
                key={response.label}
                label={response.label}
                value={response.value}
                isListItem
              />
            ))}
          </FormSubsection>
        </Box>
      </FormSection>
    </Box>
  );
}
