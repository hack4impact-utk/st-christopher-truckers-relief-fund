import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { ClientUser, ProgramEnrollment } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type RigsWithoutCigsHistoryProps = {
  user: ClientUser;
  programEnrollment: ProgramEnrollment;
};

export default function RigsWithoutCigsHistory({
  user,
  programEnrollment,
}: RigsWithoutCigsHistoryProps): ReactNode {
  const PRICE_PER_CIGARETTE = 0.4;
  const daysSinceStartOfProgram = dayjsUtil().diff(
    dayjsUtil(programEnrollment.dateEnrolled),
    "day",
  );

  const moneySaved =
    user.enrollmentForm.programSpecificQuestionsSection.rigsWithoutCigs
      .cigarettesPerDay *
    PRICE_PER_CIGARETTE *
    daysSinceStartOfProgram;

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
        History
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography>
          <strong>Money Saved:</strong> ${moneySaved.toFixed(2)}
        </Typography>
        <Typography>
          <strong>Tobacco Free for:</strong> {daysSinceStartOfProgram} day
          {daysSinceStartOfProgram !== 1 ? "s" : ""}
        </Typography>
        <Typography>
          <strong>Next prize in:</strong> 2 days
        </Typography>
      </Box>
    </Box>
  );
}
