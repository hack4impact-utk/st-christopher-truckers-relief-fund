import { Typography } from "@mui/material";

type FormResponse = {
  label: string;
  value: string;
};

export default function FormResponse({ label, value }: FormResponse) {
  return (
    <Typography>
      <Typography component="span" sx={{ fontWeight: "bold" }}>
        {label}:{" "}
      </Typography>
      {value}
    </Typography>
  );
}
