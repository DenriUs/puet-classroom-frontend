import { JWT_KEY } from '../constants';
import ApiService from './api';

const localStorage = window.localStorage;

export abstract class LoginService {
  public static async login(data: any): Promise<void> {
    const response = await ApiService.makePostRequest('/auth/login', data);
    updateStorageAuthToken(response.data?.accessToken || '');
  }
}

export const updateStorageAuthToken = (authToken: string): void => {
  localStorage.setItem(JWT_KEY, authToken);
};
