import { setToLocalStorage } from '../../helpers';
import Api from './api';

export abstract class LoginService {
  public static async login(data: any): Promise<void> {
    const response = await Api.post('/auth/login', data);
    if (response.error) return;
    setToLocalStorage('token', response.data.data.token);
  }
}
