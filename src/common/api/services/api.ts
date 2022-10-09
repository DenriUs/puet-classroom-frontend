import axios, { AxiosRequestHeaders } from 'axios';

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
      console.log(error);
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
