export interface idServiceResponse<T> {
    success: boolean;
    message?: string;
    response?: T ;
  }