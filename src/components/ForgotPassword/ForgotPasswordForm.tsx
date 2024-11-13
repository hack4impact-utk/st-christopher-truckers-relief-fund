"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ControlledTextField from "@/components/controlled/ControlledTextField";
import { handlePasswordResetRequest } from "@/server/api/password-reset-tokens/mutations";

const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

export default function ForgotPasswordForm() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);

    const { email } = data;
    await handlePasswordResetRequest(email);
    setSnackbarOpen(true);

    setIsLoading(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Password reset email sent"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "min(90vw, 700px)",
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: "1fr",
            boxShadow: 2,
            borderRadius: 2,
            padding: 3,
          }}
        >
          <Typography variant="h4">Forgot Password?</Typography>

          <ControlledTextField
            control={control}
            name="email"
            label="Email"
            variant="outlined"
            error={errors.email}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
          >
            Reset Password
          </LoadingButton>
        </Box>
      </form>
    </>
  );
}
