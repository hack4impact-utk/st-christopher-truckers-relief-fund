import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";

import { VaccineVoucherRequest } from "@/types";

type StatusInformation = {
  message: string;
  buttons: ReactNode;
};

type DeleteButtonProps = {
  vaccineVoucherRequest: VaccineVoucherRequest;
  handleDelete: (vaccineVoucherRequest: VaccineVoucherRequest) => void;
};
function DeleteButton({
  vaccineVoucherRequest,
  handleDelete,
}: Readonly<DeleteButtonProps>): ReactNode {
  return (
    <Tooltip title="Delete">
      <IconButton
        edge="end"
        onClick={() => handleDelete(vaccineVoucherRequest)}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

export function getVaccineVoucherStatusInformation(
  vaccineVoucherRequest: VaccineVoucherRequest,
  handleUpdate: (
    newVaccineVoucherRequest: VaccineVoucherRequest,
    confirmationMessage: string,
  ) => void,
  handleDelete: (vaccineVoucherRequest: VaccineVoucherRequest) => void,
): StatusInformation {
  switch (vaccineVoucherRequest.status) {
    case "requested":
      return {
        message: "Please wait while SCF reviews your request.",
        buttons: (
          <DeleteButton
            vaccineVoucherRequest={vaccineVoucherRequest}
            handleDelete={handleDelete}
          />
        ),
      };
    case "rejected":
      return {
        message: "Your request has been rejected.",
        buttons: <></>,
      };
    case "approved":
      return {
        message:
          "Your request has been approved. Please report when you have received your voucher.",
        buttons: (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleUpdate(
                { ...vaccineVoucherRequest, status: "received" },
                "Are you sure you want to report as received?",
              )
            }
          >
            Report as received
          </Button>
        ),
      };
    case "received":
      return {
        message: "Please report when you have used your vaccine voucher.",
        buttons: (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleUpdate(
                { ...vaccineVoucherRequest, status: "used" },
                "Are you sure you want to report as used?",
              )
            }
          >
            Report as used
          </Button>
        ),
      };
    case "used":
      return {
        message: "Your vaccine voucher has been used.",
        buttons: <></>,
      };
    default:
      return {
        message: "Unknown",
        buttons: (
          <DeleteButton
            vaccineVoucherRequest={vaccineVoucherRequest}
            handleDelete={handleDelete}
          />
        ),
      };
  }
}
