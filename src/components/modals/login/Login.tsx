import { Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import puetLogo from '../../../assets/puetLogo.png';

import './Login.scss';
import { LoginService } from '../../../common/api';
import { LoginSchemaType } from './types';
import { loginSchema } from './schemas';

const LoginModal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit = async (data: LoginSchemaType): Promise<void> => {
    await LoginService.login(data);
  };

  return (
    <>
      <div className='login-modal'>
        <div className='login-modal__left-side'>
          <div className='login-modal__left-side-content'>
            <img className='login-modal__logo' src={puetLogo} />
            <p className='login-modal__logo-name'>Classroom</p>
          </div>
        </div>
        <div className='login-modal__right-side'>
          <div className='login-modal__right-side-content'>
            <div className='login-modal__header'>
              <p>Вхід</p>
            </div>
            <form className='login-modal__form' onSubmit={handleSubmit(handleLoginSubmit)}>
              <div>
                <label htmlFor='email'>
                  Пошта:
                  <Controller
                    control={control}
                    name='email'
                    render={({ field: { onBlur, onChange, value } }) => (
                      <Input
                        placeholder='email@gmail.com'
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </label>
                {errors.email && <p className='form-error-label'>{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor='password'>
                  Пароль:
                  <Controller
                    control={control}
                    name='password'
                    render={({ field: { onBlur, onChange, value } }) => (
                      <Input.Password
                        placeholder='Введіть пароль'
                        iconRender={(visible: boolean) =>
                          visible ? (
                            <EyeOutlined className='eye' />
                          ) : (
                            <EyeInvisibleOutlined className='eye-invisible' />
                          )
                        }
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                </label>
                {errors.password && <p className='form-error-label'>{errors.password.message}</p>}
              </div>
              <Button className='login-modal__submit-button' type='primary' htmlType='submit'>
                Увійти
              </Button>
            </form>
          </div>
        </div>
        <div className='login-modal__close-button-container'>
          <Button
            className='login-modal__close-button'
            shape='circle'
            size='large'
            icon={<CloseOutlined />}
          />
        </div>
      </div>
      <div className='modal-overlay modal-overlay_login'></div>
    </>
  );
};

export default LoginModal;
