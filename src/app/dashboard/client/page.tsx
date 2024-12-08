// app/dashboard/client/page.tsx
import { Box } from "@mui/material";
import EnrolledProgramsSelectionScreen from "@/components/ClientDashboard/EnrolledProgramsSelectionScreen";
import { getClientActivePrograms } from "@/server/api/program-enrollments/queries";
import { ProgramEnrollment } from "@/types";

export default async function ClientDashboardPage() {
  const clientEmail = "test@example.com";
  const [programEnrollments, error] = await getClientActivePrograms(clientEmail);

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
          No accepted programs found. Check the database to ensure status is
          changed to 'accepted'.
        </p>
      </Box>
    );
  }

  const handleSelectProgram = (program: string) => {
    console.log(`Selected program: ${program}`);
    // For example: router.push(`/dashboard/client/${program.toLowerCase().replace(/ /g, "-")}`);
  };

  return (
    <EnrolledProgramsSelectionScreen
      programEnrollments={programEnrollments as ProgramEnrollment[]}
      onSelectProgram={handleSelectProgram}
    />
  );
}
