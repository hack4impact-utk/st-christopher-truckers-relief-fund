import { Box, Typography } from "@mui/material";

import FormResponse from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/FormResponse";
import { QualifyingQuestionsSection } from "@/types/EnrollmentForm";

type QualifyingQuestionResponsesProps = {
  qualifyingQuestionsSection: QualifyingQuestionsSection;
};

export default function QualifyingQuestionResponses({
  qualifyingQuestionsSection,
}: QualifyingQuestionResponsesProps) {
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
        />
        <FormResponse
          label="Heart Disease"
          value={diagnoses.hasHeartDisease ? "Yes" : "No"}
        />
        <FormResponse
          label="Obesity"
          value={diagnoses.isObese ? "Yes" : "No"}
        />
        <FormResponse label="Other" value={diagnoses.hasOther ? "Yes" : "No"} />
        <FormResponse
          label="None of the Above"
          value={diagnoses.noneOfTheAbove ? "Yes" : "No"}
        />

        {/* Additional Questions Section */}
        <Typography variant="h6">Additional Questions</Typography>

        <FormResponse
          label="Tobacco User"
          value={qualifyingQuestionsSection.isTobaccoUser ? "Yes" : "No"}
        />
        <FormResponse
          label="Applied for Financial Assistance"
          value={
            qualifyingQuestionsSection.hasAppliedForFinancialAssistance
              ? "Yes"
              : "No"
          }
        />
        <FormResponse
          label="Health Condition Caused by Tobacco Use"
          value={
            qualifyingQuestionsSection.hasHealthConditionCausedByTobaccoUse
              ? "Yes"
              : "No"
          }
        />
        <FormResponse
          label="Health Insurance"
          value={qualifyingQuestionsSection.hasHealthInsurance ? "Yes" : "No"}
        />
        <FormResponse
          label="Close Family History of Prostate Cancer"
          value={
            qualifyingQuestionsSection.hasCloseFamilyHistoryOfProstateCancer
              ? "Yes"
              : "No"
          }
        />
      </Box>
    </Box>
  );
}
