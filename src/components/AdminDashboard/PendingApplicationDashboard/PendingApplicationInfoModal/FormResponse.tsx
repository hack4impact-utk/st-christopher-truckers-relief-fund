import { Typography } from "@mui/material";

type FormResponse = {
  label: string;
  value: string;
  isListItem?: boolean;
};

export default function FormResponse({
  label,
  value,
  isListItem = false,
}: FormResponse) {
  if (isListItem) {
    return (
      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          - {label}:{" "}
        </Typography>
        {value}
      </Typography>
    );
  } else {
    return (
      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          {label}:{" "}
        </Typography>
        {value}
      </Typography>
    );
  }
}
