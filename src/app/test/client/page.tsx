"use client";

import { signOut } from "next-auth/react";

export default function ClientComponentTestPage() {
  const handleSignOut = () => {
    signOut()
      .then(() => {
        alert("Signed out");
      })
      .catch(() => {
        alert("Error signing out");
      });
  };

  return (
    <>
      <p>Client component test page</p>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
}
