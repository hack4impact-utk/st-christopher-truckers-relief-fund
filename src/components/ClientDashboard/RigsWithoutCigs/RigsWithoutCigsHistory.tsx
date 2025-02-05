import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { ReactNode } from "react";

import { ClientUser } from "@/types";

type RigsWithoutCigsHistoryProps = {
  user: ClientUser;
};

export default function RigsWithoutCigsHistory({
  user,
}: RigsWithoutCigsHistoryProps): ReactNode {
  const daysSinceStartOfProgram = dayjs(user.enrollmentForm.dateSubmitted).diff(
    dayjs(),
    "day",
  );
  const moneySaved =
    user.enrollmentForm.programSpecificQuestionsSection.rigsWithoutCigs
      .cigarettesPerDay *
    0.4 *
    daysSinceStartOfProgram;

  return (
    <>
      <Typography>Rigs Without Cigs History</Typography>
      <Typography>Money saved: ${moneySaved.toFixed(2)}</Typography>
      <Typography>
        Tobacco Free for: {daysSinceStartOfProgram} day
        {daysSinceStartOfProgram % 2 === 0 ? "s" : ""}
      </Typography>
      <Typography>Next prize in: 2 days</Typography>
    </>
  );
}
