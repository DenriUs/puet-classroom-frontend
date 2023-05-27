import { Layout } from 'antd';
import { useNavigate } from 'react-router';

import './HeaderPage.scss';

import LogoutIcon from '../Icons/LogoutIcon';
import { getUserIcon, getUserShortName, removeFromLocalStorage } from '../../common/helpers';
import { useAppSelector } from '../../hooks/reduxhooks';

const { Header } = Layout;

const HeaderPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.profileReducer);

  const onLogoutClick = () => {
    removeFromLocalStorage('token');
    navigate('/');
  };

  return (
    <Header className='header'>
      <div className='header-page'>
        <div className='header-page__items-container'>
          {getUserIcon(user)}
          <div className='name-container'>
            <span>{user && getUserShortName(user)}</span>
          </div>
          <LogoutIcon onClick={onLogoutClick} />
        </div>
      </div>
    </Header>
  );
};

export default HeaderPage;
