import {
  PlayCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  VideoCameraAddOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu, Progress } from 'antd';
import { String2HexCodeColor } from 'string-to-hex-code-color';

import './CourseHeader.scss';

import test from '../../global/images/icons/Atom.png';
import { UserRoleEnum } from '../../common/types';
import { getUserFullName } from '../../common/helpers';
import { useAppSelector } from '../../hooks/reduxhooks';
import AppLoader from '../AppLoader';
import { useState } from 'react';
import SettingModal from '../modals/settings/Settings';
import { description, statistics } from './constant';

const CourseHeader = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { course } = useAppSelector((state) => state.coursesReducer);
  const { user } = useAppSelector((state) => state.authReducer);

  const colorCard = new String2HexCodeColor(0.5);

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

  const color = {
    borderColor: colorCard.stringToColor(course.name),
  };

  return (
    <div className='course-header' style={color}>
      <div className='course-header__course-title-container'>
        <div className='course-header__course-name-container'>
          <LeftOutlined className='icon-back' />
          <span className='course-header__course-name'>{course?.name}</span>
        </div>
        <div className='course-header__author-container'>
          <span className='course-header__author-name'>{getUserFullName(course?.teacher)}</span>
          <Dropdown overlay={menu} placement='bottomLeft' className='drop-down'>
            <InfoCircleOutlined className='icon-info' />
          </Dropdown>
        </div>
      </div>
      <div className='course-header__statistics-container'>
        {statistics.map((statistic) => (
          <div className='course-header__statistic statistic'>
            {statistic.icon}
            <span className='statistic__text'>{statistic.number}</span>
            <span className='statistic__text'>{statistic.title}</span>
          </div>
        ))}
      </div>
      <div className='course-header__description-container'>
        <div className='course-header__description' style={color}>
          {description}
        </div>
      </div>
      <div>
        {user?.role == UserRoleEnum.TEACHER ? (
          <>
            <div className='course-header__buttons-container'>
              <Button
                className='course-header__button-create-meet'
                type='primary'
                shape='round'
                icon={<VideoCameraAddOutlined className='icon' />}
              >
                Розпочати зустріч
              </Button>
              <Button
                className='course-header__button-settings'
                icon={<SettingOutlined className='icon' />}
                shape='circle'
                type='primary'
                onClick={handleSettingsShow}
              >
                Налаштування
              </Button>
            </div>
            <SettingModal onStart={showSettings} handleClose={handleSettingsClose} />
          </>
        ) : (
          <div className='course-header__button-connect-container'>
            <Button
              className='course-header__button-connect'
              type='primary'
              shape='round'
              icon={<PlayCircleOutlined className='icon' />}
            >
              Приєднатися
            </Button>
          </div>
        )}
      </div>
      {user?.role == UserRoleEnum.STUDENT && (
        <div className='course-header__progress_container'>
          <div className='course-header__progress-title'>
            <span className='course-progress__name'>Прогрес курсу</span>
            <span className='course-progress__count'>25 / 30 завдань</span>
          </div>
          <Progress
            type='line'
            strokeColor={colorCard.stringToColor(course.name)}
            trailColor='rgba(199, 212, 224, 1)'
            percent={70}
            showInfo={false}
          />
        </div>
      )}
      <div className='course-header__design-container'>
        <img src={test} alt='name' className='course-header__image' />
      </div>
    </div>
  );
};

export default CourseHeader;
