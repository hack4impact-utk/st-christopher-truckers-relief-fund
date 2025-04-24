import { Box } from "@mui/material";
import { ReactNode } from "react";

import GeneralInformationFormSection from "@/components/EnrollmentForm/GeneralInformationFormSection";

export const dynamic = "force-dynamic";

export default function GeneralInformationPage(): ReactNode {
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
