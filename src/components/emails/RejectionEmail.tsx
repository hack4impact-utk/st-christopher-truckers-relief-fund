import { ReactNode } from "react";

import SCFEmail from "./SCFEmail";

type RejectionEmailProps = {
  programName: string;
  rejectReason: string;
};

export default function RejectionEmail({
  programName,
  rejectReason,
}: Readonly<RejectionEmailProps>): ReactNode {
  const previewText = `Your SCF Program Application Has Been Rejected`;
  const text = [
    `Your SCF program application for ${programName} has been rejected.`,
    `Reason: ${rejectReason}`,
  ];

  return <SCFEmail type="text-only" previewText={previewText} text={text} />;
}
