"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

type ProgramCardProps = {
  title: string;
  href: string;
};

export default function ProgramCard({
  title,
  href,
}: ProgramCardProps): ReactNode {
  const theme = useTheme();

  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <Card
        sx={{
          width: 300,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardActionArea sx={{ height: "100%" }}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h5" textAlign="center">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
