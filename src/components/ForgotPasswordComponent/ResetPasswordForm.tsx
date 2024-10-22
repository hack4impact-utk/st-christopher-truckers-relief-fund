"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { deletePasswordResetToken } from "@/server/api/password-reset-tokens/mutations";

const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
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
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const { password } = data;
    console.log(password);
    setSnackbarOpen(true);
    await deletePasswordResetToken(token);

    // wait 2 seconds before redirecting to
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Password successfully reset"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "min(90vw, 500px)",
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: "1fr",
          }}
        >
          <Typography variant="h4">Reset Password</Typography>

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Password"
                variant="outlined"
                type="password"
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                label="Confirm Password"
                variant="outlined"
                type="password"
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            Reset Password
          </Button>
        </Box>
      </form>
    </>
  );
}
