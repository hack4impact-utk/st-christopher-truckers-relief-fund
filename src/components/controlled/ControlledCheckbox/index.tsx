import { Box, Checkbox, FormControl, FormHelperText, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

// Checkbox component
type CheckboxProps = {
  name: string;
  control: any;
  label: string;
  errorMessage?: string;
};

const ControlledCheckbox = ({ name, control, label, errorMessage }: CheckboxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <FormControl error={!!errorMessage} sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => <Checkbox {...field} />}
          />
          <Typography sx={{ ml: 1 }}>{label}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <FormHelperText sx={{ m: 0 }}>{errorMessage}</FormHelperText>
        </Box>
      </FormControl>
    </Box>
  );
};

export default ControlledCheckbox;
