import { AxiosRequestConfig } from 'axios';

const TIMEOUT_SECONDS = 20;

export const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: TIMEOUT_SECONDS * 1000,
};
