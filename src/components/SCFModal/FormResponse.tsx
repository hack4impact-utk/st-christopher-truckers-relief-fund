import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type FormResponseProps = {
  label: string;
  value: string;
  showFormResponse?: boolean;
};

export default function FormResponse({
  label,
  value,
  showFormResponse = true,
}: Readonly<FormResponseProps>): ReactNode {
  if (!showFormResponse) {
    return null;
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography color="text.primary">{value}</Typography>
    </Box>
  );
}
