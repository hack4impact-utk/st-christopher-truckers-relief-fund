import { Typography } from "@mui/material";
import { ReactNode } from "react";

type FormResponseProps = {
  label: string;
  value: string | number;
  isListItem?: boolean;
};

export default function FormResponse({
  label,
  value,
  isListItem = false,
}: Readonly<FormResponseProps>): ReactNode {
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
