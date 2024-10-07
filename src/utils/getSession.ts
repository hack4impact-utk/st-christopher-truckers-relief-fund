import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// get session in server components
export default async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
