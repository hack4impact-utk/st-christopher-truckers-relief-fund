"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ControlledTextInput from "@/components/forms/ControlledTextInput";
import { deletePasswordResetToken } from "@/server/api/password-reset-tokens/mutations";
import { resetPasswordWithToken } from "@/server/api/users/mutations";

const resetPasswordFormSchema = z
  .object({
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  })
  .superRefine((val, ctx) => {
    if (val.newPassword !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

type ResetPasswordFormProps = {
  token: string;
};

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const { newPassword } = data;

    const resetPasswordResponse = await resetPasswordWithToken(
      token,
      newPassword,
    );

    if (resetPasswordResponse.success) {
      setSnackbarMessage("Password successfully reset");
      setSnackbarOpen(true);
      await deletePasswordResetToken(token);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setSnackbarMessage("Password reset failed. This link is now invalid.");
      setSnackbarOpen(true);
      await deletePasswordResetToken(token);
    }
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "min(90vw, 700px)",
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: "1fr",
            boxShadow: 1,
            borderRadius: 2,
            padding: 3,
          }}
        >
          <Typography variant="h4">Reset Password</Typography>

          <ControlledTextInput
            control={control}
            name="newPassword"
            label="New Password"
            variant="outlined"
            error={errors.newPassword}
            type="password"
          />

          <ControlledTextInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            error={errors.confirmPassword}
            type="password"
          />

          <Button type="submit" variant="contained" color="primary">
            Reset Password
          </Button>
        </Box>
      </form>
    </>
  );
}
