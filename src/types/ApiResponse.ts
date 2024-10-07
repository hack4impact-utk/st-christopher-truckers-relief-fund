type FailedApiResponse = {
  success: false;
  error: string;
};

type SuccessfulApiResponse<T> = {
  success: true;
  data?: T;
};

// Discriminated union to distinguish between successful and failed API responses
export type ApiResponse<T> = FailedApiResponse | SuccessfulApiResponse<T>;
