import { Typography } from "@mui/material";
import { ReactNode } from "react";

import { ClientUser } from "@/types";

type RigsWithoutCigsHistoryProps = {
  user: ClientUser;
};

export default function RigsWithoutCigsHistory({
  user,
}: RigsWithoutCigsHistoryProps): ReactNode {
  return <Typography>Rigs Without Cigs History</Typography>;
}
