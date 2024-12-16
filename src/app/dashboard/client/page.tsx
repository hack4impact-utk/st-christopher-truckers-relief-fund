import { Box } from "@mui/material";

import EnrolledProgramsSelectionScreen from "@/components/ClientDashboard/EnrolledProgramsSelectionScreen";
import { getClientActivePrograms } from "@/server/api/program-enrollments/queries";
import { ProgramEnrollment } from "@/types";
import getUserSession from "@/utils/getUserSession";

export default async function ClientDashboardPage() {
  const session = await getUserSession();

  // If session or session.user is null or undefined, return a friendly message or redirect
  if (!session?.user?.email) {
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
        <p>No user session found. Please log in.</p>
      </Box>
    );
  }

  const clientEmail = session.user.email;
  const [programEnrollments, error] =
    await getClientActivePrograms(clientEmail);

  if (error) {
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
        <p>Error loading programs: {String(error)}</p>
      </Box>
    );
  }

  if (!programEnrollments || programEnrollments.length === 0) {
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
        <p>
          No accepted programs found. Please ensure the status is
          &apos;accepted&apos;.
        </p>
      </Box>
    );
  }

  return (
    <EnrolledProgramsSelectionScreen
      programEnrollments={programEnrollments as ProgramEnrollment[]}
    />
  );
}
