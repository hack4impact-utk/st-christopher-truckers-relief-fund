import { Typography } from "@mui/material";
import { ReactNode } from "react";

type FormSubsectionProps = {
  title: string;
  children: ReactNode;
};

export default function FormSubsection({
  title,
  children,
}: Readonly<FormSubsectionProps>): ReactNode {
  return (
    <>
      <Typography color="text.secondary">{title}</Typography>
      {children}
    </>
  );
}
