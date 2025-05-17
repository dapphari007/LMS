import { AxiosError } from 'axios';

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  [key: string]: any;
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    
    if (response?.message) {
      return response.message;
    }
    
    if (response?.error) {
      return response.error;
    }
    
    if (error.message) {
      return error.message;
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
};