import {
  PlayCircleOutlined,
  CaretDownOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { String2HexCodeColor } from 'string-to-hex-code-color';
import { SettingOutlined } from '@ant-design/icons';

import './CourseHeader.scss';

import profileIcon from '../../assets/profileIcon.png';
import diplomaImg from '../../assets/diploma.png';
import { UserRoleEnum } from '../../common/types';
import { getUserFullName } from '../../common/helpers';
import { useAppSelector } from '../../hooks/reduxhooks';
import AppLoader from '../AppLoader';
import { useState } from 'react';
import SettingModal from '../modals/settings/Settings';

const colorCard = new String2HexCodeColor(0.5);

const CourseHeader = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { course } = useAppSelector((state) => state.coursesReducer);
  const { user } = useAppSelector((state) => state.authReducer);

  if (!course) return <AppLoader />;

  const handleSettingsClose = () => setShowSettings(false);
  const handleSettingsShow = () => setShowSettings(true);

  const menu = (
    <Menu
      items={[
        {
          label: `${course?.teacher.phoneNumber}`,
          key: '1',
          icon: <PhoneOutlined />,
        },
        {
          label: `${course?.teacher.email}`,
          key: '2',
          icon: <MailOutlined />,
        },
      ]}
    />
  );

  return (
    <div
      className='course-header'
      style={{ backgroundColor: colorCard.stringToColor(course.name) }}
    >
      <div className='course-header__name-container'>
        <span className='textt'>{course?.name}</span>
      </div>
      <div className='course-header__author-container'>
        <img src={profileIcon} className='image-author' alt='name' />
        <span className='name'>
          {getUserFullName(course?.teacher)}
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
      {user?.role == UserRoleEnum.TEACHER && (
        <>
          <div className='course-header__buttons-container'>
            <Button
              className='course-header__button-teacher'
              shape='circle'
              type='primary'
              onClick={handleSettingsShow}
            >
              <SettingOutlined className='button__icon' />
            </Button>
          </div>
          <SettingModal onStart={showSettings} handleClose={handleSettingsClose} />
        </>
      )}
      <div className='course-header__design-container'>
        <img src={diplomaImg} alt='name' className='course-header__image' />
      </div>
    </div>
  );
};

export default CourseHeader;
