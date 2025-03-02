import { Box, Typography } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

import { FagerstromTest, ProgramEnrollment, User } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";
import timeUntilNextPrize from "@/utils/timeUntilNextPrize";

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

  const prizes = timeUntilNextPrize(dayjsUtil(programEnrollment.dateEnrolled));

  const displayPrizeTime = (time: number): string => {
    return time === 0 ? "Earned" : `${time} days`;
  };

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
            <strong>Program Start Date:</strong>{" "}
            {dayjsUtil(programEnrollment.dateEnrolled).format("MM/DD/YYYY")}
          </Typography>
          <Typography>
            <strong>Tobacco Free for:</strong> {daysSinceStartOfProgram} day
            {daysSinceStartOfProgram !== 1 ? "s" : ""}
          </Typography>
          <Typography>
            <strong>1 month prize:</strong>{" "}
            {displayPrizeTime(prizes.timeUntil1Month)}
          </Typography>
          <Typography>
            <strong>6 month prize:</strong>{" "}
            {displayPrizeTime(prizes.timeUntil6Months)}
          </Typography>
          <Typography>
            <strong>1 year prize:</strong>{" "}
            {displayPrizeTime(prizes.timeUntil1Year)}
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
