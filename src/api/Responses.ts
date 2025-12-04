export type ApiSuccessResponse<T> = {
  status: number;
  data: T;
};

export type ApiErrorResponse = {
  status: number;
  error: Error;
};

export type Result<T, Error> = { data: T | null; error: Error | null };

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
