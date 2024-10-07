import AdminDashboard from "@/components/AdminDashboard";
import ClientDashboard from "@/components/ClientDashboard";
import getSession from "@/utils/getSession";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    return <p>Not signed in</p>;
  }

  const role = session.user.role;

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "client":
      return <ClientDashboard />;
    default:
      return <p>Invalid role</p>;
  }
}
