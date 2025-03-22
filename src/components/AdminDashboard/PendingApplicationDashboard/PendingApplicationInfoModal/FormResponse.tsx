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
  return (
    <Typography>
      <Typography component="span" sx={{ fontWeight: "bold" }}>
        {isListItem ? `- ${label}` : label}
        {": "}
      </Typography>
      {value}
    </Typography>
  );
}
