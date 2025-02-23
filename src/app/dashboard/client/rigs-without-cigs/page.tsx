import { ReactNode } from "react";

import RigsWithoutCigs from "@/components/ClientDashboard/RigsWithoutCigs";
import { ClientUser, ProgramEnrollment } from "@/types";

type PageProps = {
  user: ClientUser;
  programEnrollment: ProgramEnrollment;
};

export default function RigsWithoutCigsPage(props: PageProps): ReactNode {
  const { user, programEnrollment } = props;

  return <RigsWithoutCigs user={user} programEnrollment={programEnrollment} />;
}
