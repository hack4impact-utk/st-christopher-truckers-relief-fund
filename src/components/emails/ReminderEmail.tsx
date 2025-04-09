import { ReactNode } from "react";

import SCFEmail from "./SCFEmail";

type ReminderEmailProps = {
  time: string;
};

export default function ReminderEmail({
  time,
}: Readonly<ReminderEmailProps>): ReactNode {
  const preview = `Reminder: You have an meeting today with SCF`;
  const text = `You have a scheduled meeting at ${time}`;

  return <SCFEmail type="text-only" previewText={preview} text={text} />;
}
