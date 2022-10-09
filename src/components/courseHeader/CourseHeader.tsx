import {
  PlayCircleOutlined,
  CaretDownOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';

import './CourseHeader.scss';

import profileIcon from '../../assets/profileIcon.png';
import diplomaImg from '../../assets/diploma.png';

interface Props {}

const menu = (
  <Menu
    items={[
      {
        label: '+38099888239',
        key: '1',
        icon: <PhoneOutlined />,
      },
      {
        label: 'den.tacii@gmail.com',
        key: '2',
        icon: <MailOutlined />,
      },
    ]}
  />
);

const CourseHeader = (props: Props) => (
  <div className='course-header'>
    <div className='course-header__name-container'>
      <span>Хімія</span>
    </div>
    <div className='course-header__author-container'>
      <img src={profileIcon} className='image-author' alt='name' />
      <span className='name'>
        Ємець Олег Олексійович
        <Dropdown overlay={menu} placement='bottomLeft' className='drop-down'>
          <CaretDownOutlined className='icon' />
        </Dropdown>
      </span>
    </div>
    <Button
      type='primary'
      shape='round'
      icon={<PlayCircleOutlined className='icon' />}
      className='course-header__button-connect'
    >
      Приєднатися
    </Button>
    <div className='course-header__design-container'>
      <img src={diplomaImg} alt='name' className='course-header__image' />
    </div>
  </div>
);

export default CourseHeader;
