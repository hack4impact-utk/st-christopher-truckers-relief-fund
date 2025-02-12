import { Typography } from "@mui/material";
import { ReactNode } from "react";

import { ClientUser } from "@/types";

type HealthyHabitsInfoProps = {
  user: ClientUser;
};

export default function HealthyHabitsInfo({
  user,
}: HealthyHabitsInfoProps): ReactNode {
  const enrolledDate = user.programEnrollments.find(
    (enrollment) => enrollment.program === "Healthy Habits For The Long Haul",
  )?.dateEnrolled;

  const formattedDate = enrolledDate
    ? new Date(enrolledDate).toLocaleDateString()
    : "Date not available";

  return <Typography> Date Enrolled: {formattedDate} </Typography>;
}
