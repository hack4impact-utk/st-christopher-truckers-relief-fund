"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { resetPasswordWithToken } from "@/server/api/users/public-mutations";

import ControlledTextField from "../controlled/ControlledTextField";

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

export default function ResetPasswordForm({
  token,
}: Readonly<ResetPasswordFormProps>): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordFormValues): Promise<void> => {
    setIsLoading(true);

    const { newPassword } = data;

    const [, error] = await resetPasswordWithToken(token, newPassword);

    if (error === null) {
      enqueueSnackbar("Password successfully reset", { variant: "success" });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      enqueueSnackbar("Password reset failed. This link is now invalid.", {
        variant: "error",
      });

      setIsLoading(false);
      setDisabled(true);
    }
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
        <Typography variant="h4">Reset Password</Typography>

        <ControlledTextField
          control={control}
          name="newPassword"
          label="New Password"
          variant="outlined"
          error={errors.newPassword}
          type="password"
        />

        <ControlledTextField
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          error={errors.confirmPassword}
          type="password"
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
