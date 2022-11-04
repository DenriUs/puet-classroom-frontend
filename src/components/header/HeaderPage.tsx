import { Avatar, Layout } from 'antd';
import { useNavigate } from 'react-router';
import { UserOutlined } from '@ant-design/icons';

import './HeaderPage.scss';

import LogoutIcon from '../Icons/LogoutIcon';
import { getUserShortName, removeFromLocalStorage } from '../../common/helpers';
import { useAppSelector } from '../../hooks/reduxhooks';

const { Header } = Layout;

const HeaderPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.authReducer);

  const onLogoutClick = () => {
    removeFromLocalStorage('token');
    navigate('/');
  };

  return (
    <Header className='header'>
      <div className='header-page'>
        <div className='header-page__items-container'>
          <Avatar size={45} icon={<UserOutlined />} />
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
