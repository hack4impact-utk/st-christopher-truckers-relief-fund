import { ReactNode } from "react";

import SCFEmail from "./SCFEmail";

type MeetingScheduledEmailProps = {
  date: string;
  reason: string;
};

export default function ScheduledMeetingEmail({
  date,
  reason,
}: MeetingScheduledEmailProps): ReactNode {
  const preview = "You've been scheduled for a meeting with SCF";
  const text = [
    `You have been scheduled for a meeting with SCF on ${date}.`,
    `Reason: ${reason}`,
  ];
  return <SCFEmail type="text-only" previewText={preview} text={text} />;
}
