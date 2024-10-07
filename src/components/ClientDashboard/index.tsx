"use client";

import { signOut, useSession } from "next-auth/react";

export default function ClientDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Not signed in</div>;
  }

  return (
    <div>
      <p>Client dashboard</p>
      <p>{session.user._id}</p>
      <p>{session.user.firstName}</p>
      <p>{session.user.lastName}</p>
      <p>{session.user.email}</p>
      <p>{session.user.role}</p>
      <p>{session.user.dateCreated}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
