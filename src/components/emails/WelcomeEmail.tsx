import { ReactNode } from "react";

import SCFEmail from "./SCFEmail";

type WelcomeEmailProps = {
  firstName: string;
  programName: string;
};

export default function WelcomeEmail({
  firstName,
  programName,
}: Readonly<WelcomeEmailProps>): ReactNode {
  const previewText = `You've been accepted into St. Christopher Truckers Relief Fund!`;
  const text = `Hello ${firstName}! We are pleased to inform you that your application for ${programName} has been accepted. Please click on the link below to access your dashboard.`;
  const buttonText = "View your SCF Dashboard";
  const buttonUrl = `${process.env.BASE_URL}/`;

  return (
    <SCFEmail
      type="text-and-button"
      previewText={previewText}
      text={text}
      buttonText={buttonText}
      buttonUrl={buttonUrl}
    />
  );
}
