import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import LoginForm from "@/components/LoginForm";
import getUserSession from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

export default async function Home(): Promise<ReactNode> {
  const session = await getUserSession();

  if (session) {
    switch (session.user.role) {
      case "admin":
        redirect("/dashboard/admin");
        break;
      case "client":
        redirect("/dashboard/client");
        break;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        gap: 2,
      }}
    >
      <Typography variant="h6" textAlign="center">
        Welcome to the St. Christopher Truckers Relief Fund Program Dashboard
      </Typography>
      <LoginForm />

      <Link href="/enrollment-form" passHref>
        <Button variant="contained" color="primary">
          Fill out enrollment form
        </Button>
      </Link>
    </Box>
  );
}
