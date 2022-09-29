import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import puetLogo from '../../../assets/puetLogo.png';

import './Login.scss';

const LoginModal = () => {
  return (
    <>
      <div className='login-modal'>
        <div className='login-modal__left-side'>
          <img className='left-side__logo' src={puetLogo} />
          <p className='left-side__logo-name'>Classroom</p>
        </div>
        <div className='login-modal__right-side'>
          <div className='login-form'>
            <div className='header'>
              <p>Вхід</p>
            </div>
            <TextField className='email-input' label='Email' variant='standard' />
            <TextField className='password-input' label='Password' variant='standard' />
            <Button className='submit-button' variant='contained' size='large'>
              Увійти
            </Button>
          </div>
        </div>
      </div>
      <div className='modal-overlay--login'></div>
    </>
  );
};

export default LoginModal;
