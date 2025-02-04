import { ReactNode } from "react";

import SCFEmail from "./SCFEmail";

type UrgentMeetingRequestCreatedProps = {
  firstName: string;
  lastName: string;
  reason: string;
};

export default function UrgentMeetingRequestCreated({
  firstName,
  lastName,
  reason,
}: UrgentMeetingRequestCreatedProps): ReactNode {
  const preview = "Urgent meeting requested";
  const text = [
    `${firstName} ${lastName} has requested an urgent meeting.`,
    `Reason: ${reason}`,
  ];
  const buttonText = "View All Notifications";
  const buttonUrl = `${process.env.BASE_URL}/dashboard/admin/notifications`;

  return (
    <SCFEmail
      type="text-and-button"
      previewText={preview}
      text={text}
      buttonText={buttonText}
      buttonUrl={buttonUrl}
    />
  );
}
