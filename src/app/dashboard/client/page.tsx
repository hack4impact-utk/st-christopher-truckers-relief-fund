import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";

import EnrolledProgramsSelectionScreen from "@/components/ClientDashboard/EnrolledProgramsSelectionScreen";
import { getClientActivePrograms } from "@/server/api/program-enrollments/queries";
import getUserSession from "@/utils/getUserSession";

export default async function ClientDashboardPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  const clientEmail = session.user.email;
  const [programEnrollments, error] =
    await getClientActivePrograms(clientEmail);

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
