import { Box, Typography } from "@mui/material";

import FormResponse from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/FormResponse";
import { ProgramSpecificQuestionsSection } from "@/types/EnrollmentForm";

type VaccineVoucherResponsesProps = {
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection;
};

export default function VaccineVoucherResponses({
  programSpecificQuestionsSection,
}: VaccineVoucherResponsesProps) {
  const { vaccineVoucher } = programSpecificQuestionsSection;

  return (
    <Box mb={2}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textDecoration: "underline" }}
      >
        Vaccine Voucher Responses
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography style={{ textDecoration: "underline" }}>
            Vaccines to receive:
          </Typography>

          <FormResponse
            label="Flu"
            value={
              programSpecificQuestionsSection.vaccineVoucher.vaccines
                .wantsFluVaccine
                ? "Yes"
                : "no"
            }
            isListItem={true}
          />
          <FormResponse
            label="Pneumonia"
            value={
              programSpecificQuestionsSection.vaccineVoucher.vaccines
                .wantsPneumoniaVaccine
                ? "Yes"
                : "no"
            }
            isListItem={true}
          />
          <FormResponse
            label="Shingles"
            value={
              programSpecificQuestionsSection.vaccineVoucher.vaccines
                .wantsShinglesVaccine
                ? "Yes"
                : "no"
            }
            isListItem={true}
          />
          <FormResponse
            label="Covid-19"
            value={
              programSpecificQuestionsSection.vaccineVoucher.vaccines
                .wantsCovid19Vaccine
                ? "Yes"
                : "no"
            }
            isListItem={true}
          />
        </Box>
        <FormResponse
          label="Where plan on using the voucher"
          value={
            programSpecificQuestionsSection.vaccineVoucher.voucherLocation ||
            "Not specified"
          }
        />
        {/* Display additional questions or comments */}
        <FormResponse
          label="Additional Questions/Comments"
          value={vaccineVoucher.additionalQuestions || "None"}
        />
      </Box>
    </Box>
  );
}
