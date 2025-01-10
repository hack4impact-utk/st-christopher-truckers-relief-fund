import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

import { deleteHealthyHabitsTrackingForm } from "@/server/api/healthy-habits-tracking-forms/queries";
import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(),
  color: theme.palette.text.primary,
  height: "100%",
  display: "flex",
  alignItems: "center",
}));

type HealthyHabitsTrackingFormListProps = {
  trackingForms: HealthyHabitsTrackingForm[];
};

function HealthyHabitsTrackingFormList({
  trackingForms,
}: HealthyHabitsTrackingFormListProps) {
  const [selectedForm, setSelectedForm] =
    useState<HealthyHabitsTrackingForm | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenDetails = (form: HealthyHabitsTrackingForm) => {
    setSelectedForm(form);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedForm(null);
  };

  const handleOpenDeleteModal = (formId: string) => {
    setFormToDelete(formId);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setFormToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!formToDelete) return;

    setLoading(true);
    try {
      const response = await deleteHealthyHabitsTrackingForm(formToDelete);
      if (response[1] !== null) {
        console.error("Error deleting form:", response[1]);
        return;
      }
      // eslint-disable-next-line no-console
      console.log("Delete form with ID:", formToDelete);
    } finally {
      setLoading(false);
      handleCloseDeleteModal();
    }
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
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Item>
                      <Typography variant="h6">
                        Week of{" "}
                        {dayjsUtil(form.submittedDate, "MM/DD/YYYY").format(
                          "MM/D/YYYY",
                        )}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Item sx={{ justifyContent: "flex-end", gap: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => handleOpenDetails(form)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenDeleteModal(form._id!)}
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

      {/* Details Dialog */}
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
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Item>
                          <Typography>
                            Weight: {selectedForm.weight} lbs
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Item>
                          <Typography>
                            Blood Pressure: {selectedForm.systolicBloodPressure}
                            /{selectedForm.diastolicBloodPressure}
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
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

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(90vw, 500px)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Confirm Deletion</Typography>
          <Typography>
            Are you sure you want to delete this health tracking record? This
            action cannot be undone.
          </Typography>
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}
          >
            <Button onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default HealthyHabitsTrackingFormList;
