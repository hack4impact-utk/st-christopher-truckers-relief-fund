import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { QualifyingQuestionsSection } from "@/types";

import FormResponse from "./FormResponse";

type QualifyingQuestionResponsesProps = {
  qualifyingQuestionsSection: QualifyingQuestionsSection;
};

export default function QualifyingQuestionResponses({
  qualifyingQuestionsSection,
}: Readonly<QualifyingQuestionResponsesProps>): ReactNode {
  const { diagnoses } = qualifyingQuestionsSection;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Qualifying Question Responses
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Diagnoses Section */}
        <Typography variant="h6">Diagnoses</Typography>

        <FormResponse
          label="High Cholesterol"
          value={diagnoses.hasHighCholesterol ? "Yes" : "No"}
          isListItem={true}
        />
        <FormResponse
          label="Heart Disease"
          value={diagnoses.hasHeartDisease ? "Yes" : "No"}
          isListItem={true}
        />
        <FormResponse
          label="Obesity"
          value={diagnoses.isObese ? "Yes" : "No"}
          isListItem={true}
        />
        <FormResponse
          label="Other"
          value={diagnoses.hasOther ? "Yes" : "No"}
          isListItem={true}
        />
        <FormResponse
          label="None of the Above"
          value={diagnoses.noneOfTheAbove ? "Yes" : "No"}
          isListItem={true}
        />

        {/* Additional Questions Section */}
        <Typography variant="h6">Additional Questions</Typography>

        <FormResponse
          label="Tobacco User"
          value={qualifyingQuestionsSection.isTobaccoUser ? "Yes" : "No"}
          isListItem={true}
        />
        <FormResponse
          label="Applied for Financial Assistance"
          value={
            qualifyingQuestionsSection.hasAppliedForFinancialAssistance
              ? "Yes"
              : "No"
          }
          isListItem={true}
        />
        <FormResponse
          label="Health Condition Caused by Tobacco Use"
          value={
            qualifyingQuestionsSection.hasHealthConditionCausedByTobaccoUse
              ? "Yes"
              : "No"
          }
          isListItem={true}
        />
        <FormResponse
          label="Health Insurance"
          value={qualifyingQuestionsSection.hasHealthInsurance ? "Yes" : "No"}
          isListItem={true}
        />
        <FormResponse
          label="Close Family History of Prostate Cancer"
          value={
            qualifyingQuestionsSection.hasCloseFamilyHistoryOfProstateCancer
              ? "Yes"
              : "No"
          }
          isListItem={true}
        />
      </Box>
    </Box>
  );
}
