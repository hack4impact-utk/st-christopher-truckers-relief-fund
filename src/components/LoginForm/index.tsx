"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Skeleton, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import { ReactNode, Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ControlledTextField from "../controlled/ControlledTextField";

function LoginFormLoadingSkeleton(): ReactNode {
  return <Skeleton variant="rounded" width="100%" height={300} />;
}

const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .transform((email) => {
      return email.toLowerCase();
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

function LoginFormFields(): ReactNode {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    setIsLoading(true);
    setError("root", { message: "" });

    const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

    // redirect must be false, otherwise the callbackUrl will be lost
    // if the user puts it invalid credentials
    const signInResponse = await signIn("credentials", {
      ...data,
      callbackUrl: callbackUrl,
      redirect: false,
    });

    if (!signInResponse) {
      setError("root", { message: "An unknown error occurred" });
      setIsLoading(false);
      return;
    }

    if (signInResponse.error) {
      setError("root", { message: signInResponse.error });
      setIsLoading(false);
      return;
    }

    router.push(callbackUrl);
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
        <Typography variant="h4">Login</Typography>

        <ControlledTextField
          control={control}
          name="email"
          label="Email"
          variant="outlined"
          error={errors.email}
        />

        <ControlledTextField
          control={control}
          name="password"
          label="Password"
          variant="outlined"
          error={errors.password}
          type="password"
        />

        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={isLoading}
        >
          Login
        </LoadingButton>

        <Link href="/forgot-password" style={{ textDecoration: "none" }}>
          <Typography color="primary">Forgot password?</Typography>
        </Link>

        <Typography color="red">{errors.root?.message}</Typography>
      </Box>
    </form>
  );
}

export default function LoginForm(): ReactNode {
  return (
    <Suspense fallback={<LoginFormLoadingSkeleton />}>
      <LoginFormFields />
    </Suspense>
  );
}
