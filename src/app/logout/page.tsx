"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LogoutPage(): React.ReactNode {
  const router = useRouter();
  const { data: session } = useSession();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  const [message, setMessage] = useState("Logging out...");

  useEffect(() => {
    const performLogout = async (): Promise<void> => {
      try {
        if (!session) {
          setStatus("error");
          setMessage("You are not currently logged in.");
          return;
        }
        await signOut({ redirect: false });
        setStatus("success");
        setMessage("Successfully logged out.");
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage("Failed to logout. Please try again.");
      }
    };

    void performLogout();
  }, [router, session]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: "1fr",
          boxShadow: 2,
          borderRadius: 2,
          padding: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4">
          {status === "loading"
            ? "Logging Out"
            : status === "success"
              ? "Logged Out"
              : "Logout Error"}
        </Typography>

        {status === "loading" && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        )}

        <Typography
          color={status === "error" ? "error" : "text.secondary"}
          sx={{ mb: 2 }}
        >
          {message}
        </Typography>

        {status === "success" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/")}
            fullWidth
          >
            Return to Home
          </Button>
        )}

        {status === "error" && (
          <LoadingButton
            variant="contained"
            color="error"
            onClick={() => window.location.reload()}
            fullWidth
          >
            Try Again
          </LoadingButton>
        )}
      </Box>
    </Box>
  );
}
