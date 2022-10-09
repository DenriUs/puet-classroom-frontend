import { Button } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { useState } from 'react';

import './Course.scss';

import profileIcon from '../../assets/profileIcon.png';
import CourseModal from '../modals/course/Course';

interface Props {}

const Course = (props: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='course'>
      <div className='course__title-container'>
        <p className='course__title'>Мої курси</p>
        <Button
          shape='round'
          icon={<PlusCircleFilled className='icon' />}
          className='course__button'
          onClick={handleShow}
        >
          Додати курс
        </Button>
        <CourseModal onStart={show} handleClose={handleClose} />
      </div>
      <div className='course-card'>
        <div className='course-card__container'>
          <span className='title'>Хімія</span>
          <div className='image'>
            <img src={profileIcon} alt='icon' />
          </div>
          <div className='decription'>
            <span className='decription__teacher'>Викладач:</span>
            <span className='decription__name'>Олена Бабіч</span>
          </div>
        </div>
        <div className='course-card__container'>
          <span className='title'>Хімія</span>
          <div className='image'>
            <img src={profileIcon} alt='icon' />
          </div>
          <div className='decription'>
            <span className='decription__teacher'>Викладач:</span>
            <span className='decription__name'>Олена Бабіч</span>
          </div>
        </div>
        <div className='course-card__container'>
          <span className='title'>Хімія</span>
          <div className='image'>
            <img src={profileIcon} alt='icon' />
          </div>
          <div className='decription'>
            <span className='decription__teacher'>Викладач:</span>
            <span className='decription__name'>Олена Бабіч</span>
          </div>
        </div>
        <div className='course-card__container'>
          <span className='title'>Хімія</span>
          <div className='image'>
            <img src={profileIcon} alt='icon' />
          </div>
          <div className='decription'>
            <span className='decription__teacher'>Викладач:</span>
            <span className='decription__name'>Олена Бабіч</span>
          </div>
        </div>
        <div className='course-card__container'>
          <span className='title'>Хімія</span>
          <div className='image'>
            <img src={profileIcon} alt='icon' />
          </div>
          <div className='decription'>
            <span className='decription__teacher'>Викладач:</span>
            <span className='decription__name'>Олена Бабіч</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
