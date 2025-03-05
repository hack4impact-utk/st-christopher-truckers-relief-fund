import { ScreeningRequest } from "@/types";

export default function isCompeletedScreeningRequest(
  screeningRequest: ScreeningRequest,
): boolean {
  return (
    screeningRequest.status === "initial positive" ||
    screeningRequest.status === "true positive" ||
    screeningRequest.status === "false positive" ||
    screeningRequest.status === "rejected"
  );
}
