"use client";
import { ReactNode, useState } from "react";

import { ClientUser, ScreeningRequest } from "@/types";

import ClientProgramDashboard from "../ClientProgramDashboard";
import GetPreventativeScreeningsHistory from "./GetPreventativeScreeningsHistory";
import GetPreventativeScreeningsRequestForm from "./GetPreventativeScreeningsRequestForm";

type GetPreventativeScreeningsProps = {
  user: ClientUser;
};

export default function GetPreventativeScreenings({
  user,
}: Readonly<GetPreventativeScreeningsProps>): ReactNode {
  const [screeningRequests, setScreeningRequests] = useState<
    ScreeningRequest[]
  >(user.screeningRequests);

  return (
    <ClientProgramDashboard
      title="Get Preventative Screenings"
      defaultTab="apply"
      tabs={{
        apply: {
          title: "Apply",
          content: (
            <GetPreventativeScreeningsRequestForm
              user={user}
              screeningRequests={screeningRequests}
              setScreeningRequests={setScreeningRequests}
            />
          ),
        },
        history: {
          title: "History",
          content: (
            <GetPreventativeScreeningsHistory
              screeningRequests={screeningRequests}
              setScreeningRequests={setScreeningRequests}
            />
          ),
        },
      }}
    />
  );
}
