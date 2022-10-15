import { Layout } from 'antd';
import { useNavigate } from 'react-router';

import './HeaderPage.scss';

import profileIcon from '../../assets/profileIcon.png';
import LogoutIcon from '../Icons/LogoutIcon';
import { removeFromLocalStorage } from '../../common/helpers';

const { Header } = Layout;

const HeaderPage = () => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    removeFromLocalStorage('token');
    navigate('/');
  };

  return (
    <Header className='header'>
      <div className='header-page'>
        <div className='header-page__items-container'>
          <img className='profile-icon' src={profileIcon} alt='icon' />
          <div className='name-container'>
            <span>Денис Тацій</span>
          </div>
          <LogoutIcon onClick={onLogoutClick} />
        </div>
      </div>
    </Header>
  );
};

export default HeaderPage;
