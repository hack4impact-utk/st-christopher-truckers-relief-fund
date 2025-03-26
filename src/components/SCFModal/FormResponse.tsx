import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type FormResponseProps = {
  label: string;
  value: string | number;
  showFormResponse?: boolean;
  isListItem?: boolean;
};

export default function FormResponse({
  label,
  value,
  showFormResponse = true,
  isListItem = false,
}: Readonly<FormResponseProps>): ReactNode {
  if (!showFormResponse) {
    return null;
  }

  return (
    <Box sx={{ pl: isListItem ? 2 : 0 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography color="text.primary">{value}</Typography>
    </Box>
  );
}
