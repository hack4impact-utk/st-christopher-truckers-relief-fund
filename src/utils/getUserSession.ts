import { getServerSession } from "next-auth";

import authOptions from "@/app/api/auth/[...nextauth]/options";

// get session in server components
export default async function getUserSession() {
  const session = await getServerSession(authOptions);
  return session;
}
