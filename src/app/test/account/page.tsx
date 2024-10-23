"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { createUser } from "@/server/api/users/mutations";
import { User } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";

const signUpFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["admin", "client"]),
});

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export default function TestAccountCreationPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "admin",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const user: User = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
      dateCreated: new Date().toISOString(),
    };

    const response = await createUser(user);

    if (response.success) {
      alert("User created successfully");
      return;
    }

    if (response.error === apiErrors.user.userAlreadyExists) {
      alert("User already exists");
      return;
    }
    alert("Error creating user");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "min(90vw, 500px)",
            display: "grid",
            gap: 2,
            gridTemplateColumns: "1fr",
          }}
        >
          <Typography variant="h5">Create Account</Typography>

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                label="First Name"
                variant="outlined"
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                label="Last Name"
                variant="outlined"
              />
            )}
          />

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

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <>
                <FormControl>
                  <Select {...field}>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="client">Client</MenuItem>
                  </Select>
                  <FormHelperText>
                    Select the role for the new user
                  </FormHelperText>
                </FormControl>
              </>
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            Create Account
          </Button>
        </Box>
      </form>
    </Box>
  );
}
