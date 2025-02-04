"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { handleChangePassword } from "@/server/api/users/public-mutations";

import ControlledTextField from "../controlled/ControlledTextField";

const changePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
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

type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

type ChangePasswordFormProps = {
  firstName: string;
  email: string;
};

export default function ChangePasswordForm({
  firstName,
  email,
}: ChangePasswordFormProps): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues): Promise<void> => {
    setIsLoading(true);

    const { oldPassword, newPassword } = data;
    const [, error] = await handleChangePassword(
      firstName,
      email,
      oldPassword,
      newPassword,
    );

    if (error === null) {
      enqueueSnackbar("Password successfully changed");

      setTimeout(() => {
        router.push("/settings");
      }, 1000);
    } else {
      enqueueSnackbar("Password change failed.");
    }

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
        <Typography variant="h4">Change Password?</Typography>

        <ControlledTextField
          control={control}
          name="oldPassword"
          label="Old Password"
          variant="outlined"
          error={errors.oldPassword}
          type="password"
        />

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
          label="Confirm New Password"
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
          Change Password
        </LoadingButton>
      </Box>
    </form>
  );
}
