"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { ClientUser } from "@/types";

const vaccineRequestFormValidator = z.object({
  vaccineVoucher: z.object({
    vaccines: z.object({
      wantsFluVaccine: z.boolean(),
      wantsPneumoniaVaccine: z.boolean(),
      wantsShinglesVaccine: z.boolean(),
      wantsCovid19Vaccine: z.boolean(),
    }),
    voucherLocation: z.enum([
      "Walgreens",
      "Kroger and Kroger Family of Pharmacies",
      "The Little Clinic",
      "Walmart",
      "Sam's Club",
    ]),
    additionalQuestions: z.string().optional(),
  }),
});

type VaccineRequestFormValues = z.infer<typeof vaccineRequestFormValidator>;

type VaccineVoucherApplyFormProps = {
  user: ClientUser;
};

export default function VaccineVoucherApplyForm({
  user,
}: VaccineVoucherApplyFormProps): JSX.Element {
  // fixes linting error
  void user;

  const { control, handleSubmit } = useForm<VaccineRequestFormValues>({
    resolver: zodResolver(vaccineRequestFormValidator),
    defaultValues: {
      vaccineVoucher: {
        vaccines: {
          wantsFluVaccine: false,
          wantsPneumoniaVaccine: false,
          wantsShinglesVaccine: false,
          wantsCovid19Vaccine: false,
        },
        voucherLocation: "Walgreens",
        additionalQuestions: "",
      },
    },
  });

  const onSubmit = (data: VaccineRequestFormValues): void => {
    // eslint-disable-next-line no-console
    console.log("Vaccine Voucher Form Data:", data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 600,
      }}
    >
      <Typography variant="h5">Vaccine Voucher Form</Typography>

      <Controller
        name="vaccineVoucher.vaccines.wantsFluVaccine"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label="Flu Vaccine"
            control={
              <Checkbox checked={field.value} onChange={field.onChange} />
            }
          />
        )}
      />
      <Controller
        name="vaccineVoucher.vaccines.wantsPneumoniaVaccine"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label="Pneumonia Vaccine"
            control={
              <Checkbox checked={field.value} onChange={field.onChange} />
            }
          />
        )}
      />
      <Controller
        name="vaccineVoucher.vaccines.wantsShinglesVaccine"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label="Shingles Vaccine"
            control={
              <Checkbox checked={field.value} onChange={field.onChange} />
            }
          />
        )}
      />
      <Controller
        name="vaccineVoucher.vaccines.wantsCovid19Vaccine"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label="Covid-19 Vaccine"
            control={
              <Checkbox checked={field.value} onChange={field.onChange} />
            }
          />
        )}
      />

      <Controller
        name="vaccineVoucher.voucherLocation"
        control={control}
        render={({ field }) => (
          <TextField
            label="Preferred Pharmacy Location"
            select
            value={field.value}
            onChange={field.onChange}
            SelectProps={{ native: true }}
          >
            <option value="Walgreens">Walgreens</option>
            <option value="Kroger and Kroger Family of Pharmacies">
              Kroger and Kroger Family of Pharmacies
            </option>
            <option value="The Little Clinic">The Little Clinic</option>
            <option value="Walmart">Walmart</option>
            {/* For no-unescaped-entities, use Sam&apos;s Club in the visible text */}
            <option value="Sam's Club">Sam&apos;s Club</option>
          </TextField>
        )}
      />

      <Controller
        name="vaccineVoucher.additionalQuestions"
        control={control}
        render={({ field }) => (
          <TextField
            label="Any additional questions or concerns?"
            multiline
            rows={3}
            {...field}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, width: "fit-content" }}
      >
        Submit
      </Button>
    </Box>
  );
}
