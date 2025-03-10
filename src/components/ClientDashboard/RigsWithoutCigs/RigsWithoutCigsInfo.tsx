import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { ClientUser } from "@/types";

type RigsWithoutCigsInfoProps = {
  user: ClientUser;
};

export default function RigsWithoutCigsInfo({
  user,
}: Readonly<RigsWithoutCigsInfoProps>): ReactNode {
  const accountabilityPerson =
    user.enrollmentForm.programSpecificQuestionsSection.rigsWithoutCigs
      .accountabilityPerson;

  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        boxShadow: 3,
        borderRadius: 2,
        padding: 4,
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Info
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography>
          <strong>Accountability Person:</strong>{" "}
          {accountabilityPerson.firstName} {accountabilityPerson.lastName}
        </Typography>
        <Typography>
          <strong>Phone Number:</strong>{" "}
          <a href={`tel:${accountabilityPerson.phoneNumber}`}>
            {accountabilityPerson.phoneNumber}
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
