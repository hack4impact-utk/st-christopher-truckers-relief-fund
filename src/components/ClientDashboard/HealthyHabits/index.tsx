"use client";
import { ReactNode, useState } from "react";

import { ClientUser, HealthyHabitsTrackingForm } from "@/types";

import ClientProgramDashboard from "../ClientProgramDashboard";
import HealthyHabitsHistory from "./HealthyHabitsHistory";
import HealthyHabitsInfo from "./HealthyHabitsInfo";
import HealthyHabitsTracking from "./HealthyHabitsTracking";

type HealthyHabitsProps = {
  user: ClientUser;
};

export default function HealthyHabits({ user }: HealthyHabitsProps): ReactNode {
  const [trackingForms, setTrackingForms] = useState<
    HealthyHabitsTrackingForm[]
  >(user.healthyHabitsTrackingForms);

  return (
    <ClientProgramDashboard
      title="Healthy Habits"
      defaultTab="tracking"
      tabs={{
        tracking: {
          title: "Tracking",
          content: (
            <HealthyHabitsTracking
              user={user}
              trackingForms={trackingForms}
              setTrackingForms={setTrackingForms}
            />
          ),
        },
        history: {
          title: "History",
          content: (
            <HealthyHabitsHistory
              trackingForms={trackingForms}
              setTrackingForms={setTrackingForms}
              user={user}
            />
          ),
        },
        info: {
          title: "Info",
          content: <HealthyHabitsInfo user={user} />,
        },
      }}
    />
  );
}
