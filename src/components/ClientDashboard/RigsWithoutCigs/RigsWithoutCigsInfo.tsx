import { Typography } from "@mui/material";
import { ReactNode } from "react";

import { ClientUser } from "@/types";

type RigsWithoutCigsInfoProps = {
  user: ClientUser;
};

export default function RigsWithoutCigsInfo({
  user,
}: RigsWithoutCigsInfoProps): ReactNode {
  const accountabilityPerson =
    user.enrollmentForm.programSpecificQuestionsSection.rigsWithoutCigs
      .accountabilityPerson;

  return (
    <>
      <Typography>Rigs Without Cigs Info</Typography>
      <Typography>
        Accountability Person: {accountabilityPerson.firstName}{" "}
        {accountabilityPerson.lastName} | {accountabilityPerson.phoneNumber}
      </Typography>
    </>
  );
}
