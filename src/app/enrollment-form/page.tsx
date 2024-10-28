import { Box } from "@mui/material";

import GeneralInformationSection from "@/components/EnrollmentForm/GeneralInformationSection";

export default function EnrollmentForm() {
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GeneralInformationSection />
    </Box>
  );
}
