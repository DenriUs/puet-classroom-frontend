import axios, { AxiosRequestHeaders } from 'axios';
import { showErrorMessage } from '../../helpers';

import { defaultConfig } from '../constants';
import { APIResponse } from '../types';

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export default abstract class ApiService {
  private static axiosInstance = axios.create(defaultConfig);

  public static async makeRequest<T = any>(
    method: Methods,
    url: string,
    data?: any,
    headers?: AxiosRequestHeaders,
  ): Promise<APIResponse<T>> {
    try {
      const response = await ApiService.axiosInstance.request({ method, url, data, headers });
      return { data: response.data };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data || error.message;
      const message = Array.isArray(errorMessage) ? errorMessage[0] : errorMessage;
      showErrorMessage('Request error', message);
      return { error: error.message };
    }
  }

  public static async makeGetRequest<T = any>(
    url: string,
    data?: any,
    headers?: AxiosRequestHeaders,
  ): Promise<APIResponse<T>> {
    return ApiService.makeRequest<T>(Methods.GET, url, data, headers);
  }

  public static async makePostRequest<T = any>(
    url: string,
    data?: any,
    headers?: AxiosRequestHeaders,
  ): Promise<APIResponse<T>> {
    return ApiService.makeRequest<T>(Methods.POST, url, data, headers);
  }

  public static async makePatchRequest<T = any>(
    url: string,
    data?: any,
    headers?: AxiosRequestHeaders,
  ): Promise<APIResponse<T>> {
    return ApiService.makeRequest<T>(Methods.PATCH, url, data, headers);
  }

  public static async makeDeleteRequest<T = any>(
    url: string,
    data?: any,
    headers?: AxiosRequestHeaders,
  ): Promise<APIResponse<T>> {
    return ApiService.makeRequest<T>(Methods.DELETE, url, data, headers);
  }
}
