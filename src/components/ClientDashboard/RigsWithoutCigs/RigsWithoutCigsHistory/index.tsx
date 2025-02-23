import { Box, Typography } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

import { FagerstromTest, ProgramEnrollment, User } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import FagerstromTestLineCharts from "./FagerstromTestLineCharts";
import SubmittedFagerstromTestList from "./SubmittedFagerstromTestList";

type RigsWithoutCigsHistoryProps = {
  user: User;
  programEnrollment: ProgramEnrollment;
  fagerstromTests: FagerstromTest[];
  setFagerstromTests: Dispatch<SetStateAction<FagerstromTest[]>>;
};

export default function RigsWithoutCigsHistory({
  user,
  programEnrollment,
  fagerstromTests,
  setFagerstromTests,
}: RigsWithoutCigsHistoryProps): ReactNode {
  const daysSinceStartOfProgram = dayjsUtil().diff(
    dayjsUtil(programEnrollment.dateEnrolled),
    "day",
  );

  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
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

      <FagerstromTestLineCharts fagerstromTests={fagerstromTests} />
      <SubmittedFagerstromTestList
        user={user}
        fagerstromTests={fagerstromTests}
        setFagerstromTests={setFagerstromTests}
      />
    </Box>
  );
}
