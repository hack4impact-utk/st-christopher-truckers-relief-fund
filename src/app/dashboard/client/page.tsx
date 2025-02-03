import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import EnrolledProgramsSelectionScreen from "@/components/ClientDashboard/EnrolledProgramSelectionScreen.tsx";
import { getUserByEmail } from "@/server/api/users/queries";
import { ClientUser } from "@/types";
import getUserSession from "@/utils/getUserSession";

export default async function ClientDashboardPage(): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  const [user, error] = await getUserByEmail(session.user.email, {
    populateProgramEnrollments: true,
  });

  if (error !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          There was an error fetching your active programs.
        </Typography>
      </Box>
    );
  }

  const programEnrollments = (user as ClientUser).programEnrollments.filter(
    (programEnrollment) => programEnrollment.status === "accepted",
  );

  if (programEnrollments.length === 0) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography>Your application is still being reviewed.</Typography>
        <Typography variant="body1">
          Please reach out to us at our{" "}
          <Link href="https://truckersfund.org/contact-us">
            <Typography variant="inherit" color="primary" component="span">
              contact page{" "}
            </Typography>
          </Link>
          if you have any questions or concerns.
        </Typography>
      </Box>
    );
  }

  return (
    <EnrolledProgramsSelectionScreen programEnrollments={programEnrollments} />
  );
}
