import { Box } from "@mui/material";

import GeneralInformationSection from "@/components/EnrollmentForm/GeneralInformationSection";

export default function EnrollmentForm() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GeneralInformationSection />
    </Box>
  );
}
