/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

import useEnrollmentForm from "@/hooks/useEnrollmentForm";

export default function SubmittedFormSection() {
  const { resetEnrollmentForm } = useEnrollmentForm();

  // reset form on page load
  useEffect(() => {
    resetEnrollmentForm();
  }, []);

  return (
    <Box sx={{ width: "min(90vw, 700px)", textAlign: "center" }}>
      <Typography variant="body1">
        Thank you for completing the enrollment form!
      </Typography>
      <Typography variant="body1">
        We will review your application and get back to you soon.
      </Typography>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Typography variant="body1" color="primary">
          Return to home
        </Typography>
      </Link>
    </Box>
  );
}
