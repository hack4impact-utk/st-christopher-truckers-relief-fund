import { SxProps, TextField, Theme } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

type ControlledTextFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  variant: "standard" | "outlined" | "filled";
  error?: FieldError;
  sx?: SxProps<Theme>;
  type?: HTMLInputTypeAttribute;
  slotProps?: Record<string, unknown>;
  multiline?: boolean;
  required?: boolean;
  rows?: number;
  convertToNumber?: boolean;
};

export default function ControlledTextField(props: ControlledTextFieldProps) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <TextField
          {...field}
          label={props.label}
          variant={props.variant}
          error={!!props.error}
          helperText={props.error?.message}
          sx={props.sx}
          type={props.type}
          slotProps={props.slotProps}
          multiline={props.multiline}
          required={props.required}
          rows={props.rows}
          onChange={
            props.convertToNumber
              ? (e) => {
                  const numericValue = parseFloat(e.target.value);
                  field.onChange(isNaN(numericValue) ? "" : numericValue);
                }
              : field.onChange
          }
        />
      )}
    />
  );
}
