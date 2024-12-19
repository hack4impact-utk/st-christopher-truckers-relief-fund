import { Box, Typography } from "@mui/material";

import FormResponse from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/FormResponse";
import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm";

type GetPreventativeScreeningResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function GetPreventativeScreeningResponses({
  programSpecificQuestionsSection,
}: GetPreventativeScreeningResponsesProps) {
  return (
    <Box mb={2}>
      <Typography variant="h6" gutterBottom>
        Get Preventative Screenings Responses
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormResponse
          label="Agree to Provide Screening Results"
          value={
            programSpecificQuestionsSection.getPreventativeScreenings
              .agreeToShareResults
              ? "Yes"
              : "No"
          }
        />
        <FormResponse
          label="Agree to Get Account Registered"
          value={
            programSpecificQuestionsSection.getPreventativeScreenings
              .prostateScreening.agreeToGetAccountRegistered
              ? "Yes"
              : "No"
          }
        />
        <FormResponse
          label="Agree to Prostate Screening"
          value={
            programSpecificQuestionsSection.getPreventativeScreenings
              .prostateScreening.agreesToProstateScreening
              ? "Yes"
              : "No"
          }
        />
        <FormResponse
          label="Not Applicable"
          value={
            programSpecificQuestionsSection.getPreventativeScreenings
              .prostateScreening.isNotApplicable
              ? "Yes"
              : "No"
          }
        />
        <FormResponse
          label="Additional Questions/Comments"
          value={
            programSpecificQuestionsSection.getPreventativeScreenings
              .prostateScreening.additionalQuestions || "None"
          }
        />
      </Box>
    </Box>
  );
}
