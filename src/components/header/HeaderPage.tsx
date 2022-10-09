import { Layout } from 'antd';

import './HeaderPage.scss';

import profileIcon from '../../assets/profileIcon.png';

const { Header } = Layout;

const HeaderPage = () => (
  <Header className='header'>
    <div className='header-page'>
      <div className='header-page__name-container'>
        <span>Ласкаво просимо, Денис</span>
      </div>
      <div className='header-page__items-container'>
        <div className='image-container'>
          <img src={profileIcon} alt='icon' />
        </div>
        <div className='name-container'>
          <span>Денис Тацій</span>
        </div>
      </div>
    </div>
  </Header>
);

export default HeaderPage;
