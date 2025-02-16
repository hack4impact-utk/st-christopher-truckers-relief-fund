/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

import useEnrollmentForm from "@/hooks/useEnrollmentForm";

export default function SubmittedFormSection(): ReactNode {
  const { resetEnrollmentForm } = useEnrollmentForm();

  // reset form on page load
  useEffect(() => {
    resetEnrollmentForm();
  }, []);

  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography>Thank you for completing the enrollment form!</Typography>
      <Typography>
        We will review your application and get back to you soon via email.
      </Typography>
      <Typography>
        If you don&apos;t see our email in your inbox, please check your spam or
        junk folder.
      </Typography>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Typography color="primary">Return to home</Typography>
      </Link>
    </Box>
  );
}
