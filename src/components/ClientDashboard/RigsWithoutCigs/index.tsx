"use client";
import { ReactNode, useState } from "react";

import { ClientUser, FagerstromTest, ProgramEnrollment } from "@/types";

import ClientProgramDashboard from "../ClientProgramDashboard";
import FagerstromTestForm from "./FagerstromTestForm";
import RigsWithoutCigsHistory from "./RigsWithoutCigsHistory";
import RigsWithoutCigsInfo from "./RigsWithoutCigsInfo";

type RigsWithoutCigsProps = {
  user: ClientUser;
  programEnrollment: ProgramEnrollment;
};

export default function RigsWithoutCigs({
  user,
  programEnrollment,
}: RigsWithoutCigsProps): ReactNode {
  const [fagerstromTests, setFagerstromTests] = useState<FagerstromTest[]>(
    user.fagerstromTests,
  );

  return (
    <ClientProgramDashboard
      title="Rigs Without Cigs"
      defaultTab="fagerstromTest"
      tabs={{
        fagerstromTest: {
          title: "Fagerstrom Test",
          content: (
            <FagerstromTestForm
              user={user}
              setFagerstromTests={setFagerstromTests}
            />
          ),
        },
        history: {
          title: "History",
          content: (
            <RigsWithoutCigsHistory
              user={user}
              programEnrollment={programEnrollment}
              fagerstromTests={fagerstromTests}
              setFagerstromTests={setFagerstromTests}
            />
          ),
        },
        info: {
          title: "Info",
          content: <RigsWithoutCigsInfo user={user} />,
        },
      }}
    />
  );
}
