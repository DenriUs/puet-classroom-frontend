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
import { useNavigate } from 'react-router';

import test from '../../global/images/icons/Test.png';
import { UserRoleEnum } from '../../common/types';
import { getUserFullName } from '../../common/helpers';
import { useAppSelector } from '../../hooks/reduxhooks';
import AppLoader from '../AppLoader';
import { statistics } from './constant';

import './CourseHeader.scss';

const CourseHeader = () => {
  const { course } = useAppSelector((state) => state.coursesReducer);
  const { user } = useAppSelector((state) => state.authReducer);

  const navigate = useNavigate();

  if (!course) return <AppLoader />;

  const onLeftClick = () => navigate('/main/home');
  const onSettingsClick = () => navigate('settings');

  const menu = (
    <Menu
      items={[
        {
          key: 1,
          label: `${course?.teacher.phoneNumber}`,
          icon: <PhoneOutlined />,
        },
        {
          key: 2,
          label: `${course?.teacher.email}`,
          icon: <MailOutlined />,
        },
      ]}
    />
  );

  return (
    <div className='course-header' style={{ borderColor: course.color }}>
      <div className='course-header__course-title-container'>
        <div className='course-header__course-name-container'>
          <LeftOutlined className='icon-back' onClick={onLeftClick} />
          <span className='course-header__course-name'>{course.name}</span>
        </div>
        <div className='course-header__author-container'>
          <span className='course-header__author-name'>{getUserFullName(course.teacher)}</span>
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
        <div className='course-header__description' style={{ borderColor: course.color }}>
          {course.description}
        </div>
      </div>
      <div>
        {user?.role === UserRoleEnum.TEACHER ? (
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
              onClick={onSettingsClick}
            >
              Налаштування
            </Button>
          </div>
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
      {user?.role === UserRoleEnum.STUDENT && (
        <div className='course-header__progress_container'>
          <div className='course-header__progress-title'>
            <span className='course-progress__name'>Прогрес курсу</span>
            <span className='course-progress__count'>25 / 30 завдань</span>
          </div>
          <Progress
            type='line'
            strokeColor={course.color}
            trailColor='rgba(199, 212, 224, 1)'
            percent={70}
            showInfo={false}
          />
        </div>
      )}
      <div className='course-header__design-container'>
        {course.cover.src ? (
          <img src={course.cover.src} alt='name' className='course-header__image' />
        ) : (
          <img src={test} alt='test' className='course-header__image' />
        )}
      </div>
    </div>
  );
};

export default CourseHeader;
