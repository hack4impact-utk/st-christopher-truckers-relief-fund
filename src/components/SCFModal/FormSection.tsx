import { Typography } from "@mui/material";
import { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  children: ReactNode;
};

export default function FormSection({
  title,
  children,
}: Readonly<FormSectionProps>): ReactNode {
  return (
    <>
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
      {children}
    </>
  );
}
