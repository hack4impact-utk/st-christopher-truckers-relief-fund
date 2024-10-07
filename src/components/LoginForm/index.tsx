"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
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
      <Typography variant="h4" sx={{ mb: 2 }}>
        Login
      </Typography>

      <Box
        sx={{
          width: "min(90vw, 500px)",
          display: "grid",
          gap: 2,
          gridTemplateColumns: "1fr",
        }}
      >
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

        <Typography variant="h6" fontWeight="normal" color="red">
          {errors.root?.message}
        </Typography>
      </Box>
    </form>
  );
}
