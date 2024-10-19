import React from "react";
import WelcomeEmail from "@/components/emails/WelcomeEmail";

export default function Home() {
  return (
    <>
      <WelcomeEmail firstName="John" programName="Test Program" />
    </>
  );
}
