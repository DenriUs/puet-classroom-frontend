import { setToLocalStorage } from '../../helpers';
import { JWT_KEY } from '../constants';
import ApiService from './api';

const localStorage = window.localStorage;

export abstract class LoginService {
  public static async login(data: any): Promise<void> {
    const response = await ApiService.makePostRequest('/auth/login', data);
    if (response.error) return;
    setToLocalStorage('token', response.data.accessToken);
  }
}
