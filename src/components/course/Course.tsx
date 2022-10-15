import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import hatIcon from '../../global/images/icons/hat.svg';
import { Progress } from 'antd';

import './Course.scss';

interface Props {}

const Course = (props: Props) => {
  return (
    <div className='course'>
      <div className='course__title-container'>
        <p className='course__title'>Мої поточні курси</p>
      </div>
      <div className='course-card'>
        <div className='course-card__container'>
          <img src={hatIcon} className='icon-study' alt='icon' />
          <span className='title'>Аналіз даних та проектува...</span>
          <div className='decription'>
            <span className='decription__icon'>
              <UserOutlined />
            </span>
            <span className='decription__name'>Олена Бабіч</span>
          </div>
          <div className='progress-container'>
            <Progress
              strokeColor='rgba(219, 69, 46, 0.49)'
              trailColor='rgba(255, 255, 255, 0.54)'
              type='circle'
              percent={40}
            />
          </div>
        </div>
        <div className='course-card__container'>
          <img src={hatIcon} className='icon-study' alt='icon' />
          <span className='title'>Аналіз даних та проектува...</span>
          <div className='decription'>
            <span className='decription__icon'>
              <UserOutlined />
            </span>
            <span className='decription__name'>Олена Бабіч</span>
          </div>
          <div className='progress-container'>
            <Progress
              strokeColor='rgba(219, 69, 46, 0.49)'
              trailColor='rgba(255, 255, 255, 0.54)'
              type='circle'
              percent={60}
            />
          </div>
        </div>
        <div className='course-card__container'>
          <img src={hatIcon} className='icon-study' alt='icon' />
          <span className='title'>Аналіз даних та проектува...</span>
          <div className='decription'>
            <span className='decription__icon'>
              <UserOutlined />
            </span>
            <span className='decription__name'>Олена Бабіч</span>
          </div>
          <div className='progress-container'>
            <Progress
              strokeColor='rgba(219, 69, 46, 0.49)'
              trailColor='rgba(255, 255, 255, 0.54)'
              type='circle'
              percent={90}
            />
          </div>
        </div>
        <div className='course-card__container'>
          <img src={hatIcon} className='icon-study' alt='icon' />
          <span className='title'>Аналіз даних та проектува...</span>
          <div className='decription'>
            <span className='decription__icon'>
              <UserOutlined />
            </span>
            <span className='decription__name'>Олена Бабіч</span>
          </div>
          <div className='progress-container'>
            <Progress
              strokeColor='rgba(219, 69, 46, 0.49)'
              trailColor='rgba(255, 255, 255, 0.54)'
              type='circle'
              percent={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
