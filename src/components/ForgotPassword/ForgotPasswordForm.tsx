"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import handlePasswordResetRequest from "@/server/api/password-reset-tokens/public-mutations";

import ControlledTextField from "../controlled/ControlledTextField";

const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

export default function ForgotPasswordForm(): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormValues): Promise<void> => {
    setIsLoading(true);

    const { email } = data;
    await handlePasswordResetRequest(email);
    enqueueSnackbar("Password reset email sent", { variant: "success" });

    setIsLoading(false);
    setDisabled(true);
  };

  return (
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
          disabled={disabled}
        >
          Reset Password
        </LoadingButton>
      </Box>
    </form>
  );
}
