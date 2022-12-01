export interface BaseResponse<T> {
  success: boolean;
  errors: string[];
  content: T;
}
