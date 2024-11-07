import { Box } from "@mui/material";

import GeneralInformationFormSection from "@/components/EnrollmentForm/GeneralInformationFormSection";

export default function GeneralInformationPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "25vh",
      }}
    >
      <GeneralInformationFormSection />
    </Box>
  );
}
