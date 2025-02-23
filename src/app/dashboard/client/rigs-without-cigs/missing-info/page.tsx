import AddRigsWithoutCigsInformation from "@/components/ClientDashboard/RigsWithoutCigs/RigsWithoutCigsInfo";
import { ClientUser, ProgramEnrollment } from "@/types";

type PageProps = {
  user: ClientUser;
  programEnrollment: ProgramEnrollment;
};

export default function RigsWithoutCigsMissingInfoPage(
  props: PageProps,
): JSX.Element {
  const { user } = props;
  // return <AddRigsWithoutCigsInformation user={user} />;
  return <>Hello World</>;
}
