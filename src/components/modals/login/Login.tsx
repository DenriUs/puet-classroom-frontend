import puetLogo from '../../../../public/puetLogo.png';

import './Login.scss';

const LoginModal = () => {
  return (
    <>
      <div className="login-modal">
        <div className="login-modal__left-side">
          <img src={puetLogo} />
        </div>
        <div className="login-modal__right-side"></div>
      </div>
      <div className="modal-overlay--login"></div>
    </>
  );
};

export default LoginModal;
