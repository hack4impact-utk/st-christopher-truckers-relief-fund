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
  const PRICE_PER_CIGARETTE = 0.4;
  const daysSinceStartOfProgram = dayjs(user.enrollmentForm.dateSubmitted).diff(
    dayjs(),
    "day",
  );

  const moneySaved =
    user.enrollmentForm.programSpecificQuestionsSection.rigsWithoutCigs
      .cigarettesPerDay *
    PRICE_PER_CIGARETTE *
    daysSinceStartOfProgram;

  return (
    <>
      <Typography>Money saved: ${moneySaved.toFixed(2)}</Typography>
      <Typography>
        Tobacco Free for: {daysSinceStartOfProgram} day
        {daysSinceStartOfProgram % 2 === 0 ? "s" : ""}
      </Typography>
      <Typography>Next prize in: 2 days</Typography>
    </>
  );
}
