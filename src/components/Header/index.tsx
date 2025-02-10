"use client";

import AccountIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

import Logo from "../Logo";

export function Header(): ReactNode {
  const { data: session } = useSession();

  return (
    <header
      style={{
        display: "flex",
        height: "100px",
        width: "100vw",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: "1.5rem",
        position: "fixed",
        top: 0,
        left: 0,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
        zIndex: 999,
      }}
    >
      <Link href="/" style={{ width: "100px", height: "100px" }}>
        <Logo width={100} height={100} alt="SCF Logo" />
      </Link>
      {session && (
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href="/profile"
          endIcon={<AccountIcon />}
        >
          Profile
        </Button>
      )}
    </header>
  );
}
