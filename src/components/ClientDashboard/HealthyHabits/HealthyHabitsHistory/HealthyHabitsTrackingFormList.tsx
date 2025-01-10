import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type HealthyHabitsTrackingFormListProps = {
  trackingForms: HealthyHabitsTrackingForm[];
};

const HealthyHabitsTrackingFormList = ({
  trackingForms,
}: HealthyHabitsTrackingFormListProps) => {
  const [selectedForm, setSelectedForm] =
    useState<HealthyHabitsTrackingForm | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleOpenDetails = (form: HealthyHabitsTrackingForm) => {
    setSelectedForm(form);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedForm(null);
  };

  const handleDelete = (formId: string) => {
    // TODO: Implement delete functionality with server action
    console.log("Delete form with ID:", formId);
  };

  const groupFormsByWeek = (forms: HealthyHabitsTrackingForm[]) => {
    const sortedForms = [...forms].sort((a, b) =>
      dayjsUtil(b.submittedDate, "MM/DD/YYYY").diff(
        dayjsUtil(a.submittedDate, "MM/DD/YYYY"),
      ),
    );

    return sortedForms;
  };

  const sortedForms = groupFormsByWeek(trackingForms);

  return (
    <Box
      sx={{
        paddingTop: 5,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        width: "100%",
      }}
    >
      {sortedForms.map((form) => (
        <Card key={form._id} sx={{ width: "100%" }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6">
                  Week of{" "}
                  {dayjsUtil(form.submittedDate, "MM/DD/YYYY").format(
                    "MMM D, YYYY",
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box
                  sx={{ 
                    display: "flex", 
                    gap: 2, 
                    justifyContent: "flex-end",
                    alignItems: "center",
                    height: "100%"
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenDetails(form)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(form._id!)}
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        {selectedForm && (
          <>
            <DialogTitle>
              Health Tracking Details -{" "}
              {dayjsUtil(selectedForm.submittedDate, "MM/DD/YYYY").format(
                "MMM D, YYYY",
              )}
            </DialogTitle>
            <DialogContent>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 3, py: 2 }}
              >
                <Typography>
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    Health Conditions:
                  </Box>{" "}
                  {selectedForm.healthConditions}
                </Typography>

                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Measurements
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>Weight: {selectedForm.weight} lbs</Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>
                        Blood Pressure: {selectedForm.systolicBloodPressure}/
                        {selectedForm.diastolicBloodPressure}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>
                        Blood Glucose: {selectedForm.bloodGlucose}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Daily Activity
                  </Typography>
                  <Typography>
                    Movement Minutes: {selectedForm.movementMinutes}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Wellness Rankings
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>
                        Sleep: {selectedForm.sleepRanking}/5
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>
                        Energy: {selectedForm.energyRanking}/5
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>
                        Emotional Health: {selectedForm.emotionalHealthRanking}
                        /5
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Goals
                  </Typography>
                  <Typography>{selectedForm.qualitativeGoals}</Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default HealthyHabitsTrackingFormList;