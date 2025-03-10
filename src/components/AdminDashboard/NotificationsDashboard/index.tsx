"use client";

import { ReactNode } from "react";

import { ClientUser, ScheduledMeeting, UrgentMeetingRequest } from "@/types";

import AdminProgramDashboard from "../AdminProgramDashboard";
import ScheduledMeetings from "./ScheduledMeetings";
import UrgentMeetingRequests from "./UrgentMeetingRequests";

type NotificationsDashboardProps = {
  urgentMeetingRequests: UrgentMeetingRequest[];
  scheduledMeetings: ScheduledMeeting[];
  allClients: ClientUser[];
};

export default function NotificationsDashboard({
  urgentMeetingRequests,
  scheduledMeetings,
  allClients,
}: Readonly<NotificationsDashboardProps>): ReactNode {
  return (
    <AdminProgramDashboard
      defaultTab="urgentMeetingRequests"
      tabs={{
        urgentMeetingRequests: {
          title: "Urgent Meeting Requests",
          content: (
            <UrgentMeetingRequests
              urgentMeetingRequests={urgentMeetingRequests}
            />
          ),
        },
        scheduledMeetingRequests: {
          title: "Scheduled Meetings",
          content: (
            <ScheduledMeetings
              scheduledMeetings={scheduledMeetings}
              allClients={allClients}
            />
          ),
        },
      }}
    />
  );
}
