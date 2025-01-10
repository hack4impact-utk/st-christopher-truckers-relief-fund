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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

const Item = styled('div')(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
}));

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
    console.log("Delete form with ID:", formId);
  };

  const groupFormsByWeek = (forms: HealthyHabitsTrackingForm[]) => {
    return [...forms].sort((a, b) =>
      dayjsUtil(b.submittedDate, "MM/DD/YYYY").diff(
        dayjsUtil(a.submittedDate, "MM/DD/YYYY"),
      ),
    );
  };

  const sortedForms = groupFormsByWeek(trackingForms);

  return (
    <Box sx={{ flexGrow: 1, pt: 5 }}>
      <Grid container spacing={3}>
        {sortedForms.map((form) => (
          <Grid key={form._id} size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Item>
                      <Typography variant="h6">
                        Week of{" "}
                        {dayjsUtil(form.submittedDate, "MM/DD/YYYY").format(
                          "MMM D, YYYY",
                        )}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Item sx={{ justifyContent: "flex-end", gap: 2 }}>
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
                    </Item>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
              <Box sx={{ pt: 2 }}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <Item>
                      <Typography>
                        <Box component="span" sx={{ fontWeight: "bold" }}>
                          Health Conditions:
                        </Box>{" "}
                        {selectedForm.healthConditions}
                      </Typography>
                    </Item>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">Measurements</Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Item>
                          <Typography>
                            Weight: {selectedForm.weight} lbs
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Item>
                          <Typography>
                            Blood Pressure: {selectedForm.systolicBloodPressure}
                            /{selectedForm.diastolicBloodPressure}
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Item>
                          <Typography>
                            Blood Glucose: {selectedForm.bloodGlucose}
                          </Typography>
                        </Item>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">Daily Activity</Typography>
                    <Item>
                      <Typography>
                        Movement Minutes: {selectedForm.movementMinutes}
                      </Typography>
                    </Item>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">Wellness Rankings</Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Item>
                          <Typography>
                            Sleep: {selectedForm.sleepRanking}/5
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Item>
                          <Typography>
                            Energy: {selectedForm.energyRanking}/5
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Item>
                          <Typography>
                            Emotional Health:{" "}
                            {selectedForm.emotionalHealthRanking}/5
                          </Typography>
                        </Item>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h6">Goals</Typography>
                    <Item>
                      <Typography>{selectedForm.qualitativeGoals}</Typography>
                    </Item>
                  </Grid>
                </Grid>
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
