import { ReactNode } from "react";

import { getNumberOfUrgentMeetingRequests } from "@/server/api/urgent-meeting-requests/queries";

import Sidebar from "./SidebarComponent";

export default async function SidebarWrapper(): Promise<ReactNode> {
  const numberOfUrgentMeetingRequests =
    await getNumberOfUrgentMeetingRequests();

  return (
    <Sidebar numberOfUrgentMeetingRequests={numberOfUrgentMeetingRequests} />
  );
}
