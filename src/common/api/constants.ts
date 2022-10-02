import { AxiosRequestConfig } from 'axios';

const TIMEOUT_SECONDS = 20;

export const defaultConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:8080/api/v1',
  timeout: TIMEOUT_SECONDS * 1000,
};

export const JWT_KEY = 'jwt';
