"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Skeleton, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

function LoginFormLoadingSkeleton() {
  return <Skeleton variant="rounded" width="100%" height={300} />;
}

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

function LoginFormFields() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setError("root", { message: error });
    }
  }, [searchParams, setError]);

  const onSubmit = async (data: LoginFormValues) => {
    setError("root", { message: "" });
    signIn("credentials", { ...data, callbackUrl: "/dashboard" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: "1fr",
        }}
      >
        <Typography variant="h4">Login</Typography>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.email}
              helperText={errors.email?.message}
              label="Email"
              variant="outlined"
            />
          )}
        />

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

        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>

        <Link href="/forgot-password" style={{ textDecoration: "none" }}>
          <Typography variant="body1" color="primary">
            Forgot password?
          </Typography>
        </Link>

        <Typography variant="body1" fontWeight="normal" color="red">
          {errors.root?.message}
        </Typography>
      </Box>
    </form>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<LoginFormLoadingSkeleton />}>
      <LoginFormFields />
    </Suspense>
  );
}
