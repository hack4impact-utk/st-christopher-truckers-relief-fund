import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { ProgramEnrollment } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type RigsWithoutCigsHistoryProps = {
  programEnrollment: ProgramEnrollment;
};

export default function RigsWithoutCigsHistory({
  programEnrollment,
}: RigsWithoutCigsHistoryProps): ReactNode {
  const daysSinceStartOfProgram = dayjsUtil().diff(
    dayjsUtil(programEnrollment.dateEnrolled),
    "day",
  );

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
