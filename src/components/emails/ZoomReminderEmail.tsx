import { ReactNode } from "react";

import SCFEmail from "./SCFEmail";

type ZoomReminderEmailProps = {
  meetingName: string;
  meetingLink: string;
};

export default function ZoomReminderEmail({
  meetingName,
  meetingLink,
}: Readonly<ZoomReminderEmailProps>): ReactNode {
  const preview = `Reminder: You have an upcoming ${meetingName} meeting`;
  const text = `Please click the link below to join the zoom call for ${meetingName}.`;
  const buttonText = "Join Meeting";

  return (
    <SCFEmail
      type="text-and-button"
      previewText={preview}
      text={text}
      buttonText={buttonText}
      buttonUrl={meetingLink}
    />
  );
}
