export type APIResponse<T = any> = {
  data?: T;
  error?: {
    message: string;
  };
};
