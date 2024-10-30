type FailedApiResponse = [null, string];

type SuccessfulApiResponse<T> = [T, null];

// Discriminated union to distinguish between successful and failed API responses
export type ApiResponse<T> = FailedApiResponse | SuccessfulApiResponse<T>;
