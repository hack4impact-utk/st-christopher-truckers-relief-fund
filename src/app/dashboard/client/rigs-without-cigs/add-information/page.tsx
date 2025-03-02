"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";

import RigsWithoutCigsProgramSpecificQuestions from "@/components/EnrollmentForm/ProgramSpecificQuestions/RigsWithoutCigsProgramSpecificQuestions";
import { updateProgramInformation } from "@/server/api/rigs-without-cigs/public-mutations";
import {
  ProgramSpecificQuestionsSection,
  programSpecificQuestionsSectionValidator,
} from "@/types";

export default function AddRigsWithoutCigsInformationPage(): ReactNode {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount, isSubmitSuccessful },
    watch,
  } = useForm<ProgramSpecificQuestionsSection>({
    resolver: zodResolver(programSpecificQuestionsSectionValidator),
    defaultValues: {
      hasOptedInToRigsWithoutCigs: true,
      rigsWithoutCigs: {
        tobaccoForm: {
          doesUseCigarettes: false,
          doesUseSmokelessTobacco: false,
        },
      },
    },
  });

  const onSubmit = async (
    data: ProgramSpecificQuestionsSection,
  ): Promise<void> => {
    console.log("Form Submission State:", {
      data,
      errors,
      isValid: Object.keys(errors).length === 0,
      submitCount,
      isSubmitSuccessful,
    });
    try {
      setIsLoading(true);

      const [, error] = await updateProgramInformation(data);

      if (error !== null) {
        throw error;
      }

      enqueueSnackbar("Information saved successfully", { variant: "success" });
      router.push("/dashboard/client/rigs-without-cigs");
    } catch (err) {
      console.error("Failed to save information:", err);
      enqueueSnackbar("Failed to save information", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (): void => {
    console.log("Form Validation Failed:", {
      errors,
      submitCount,
      isSubmitSuccessful,
      values: watch(),
    });
    enqueueSnackbar("Please review all fields before continuing", {
      variant: "error",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit, onError)}
      sx={{
        width: "min(90vw, 700px)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mx: "auto",
        pt: 16,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Rigs Without Cigs Information
      </Typography>

      <RigsWithoutCigsProgramSpecificQuestions
        control={control}
        errors={errors}
        watch={watch}
      />

      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        loading={isLoading}
        sx={{ mt: 2 }}
      >
        Save Information
      </LoadingButton>

      <Typography color="red">
        {submitCount && !isSubmitSuccessful
          ? "Please review all fields before continuing."
          : ""}
      </Typography>
    </Box>
  );
}
