import { Button, Dropdown, Menu, Modal } from 'antd';
import {
  PlusCircleFilled,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

import './Course.scss';

import profileIcon from '../../assets/profileIcon.png';
import CourseModal from '../modals/course/Course';

const { confirm } = Modal;

interface Props {}

const showDeleteConfirm = () => {
  confirm({
    title: 'Ви дійсно бажаєте видалити курс ?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Так',
    okType: 'danger',
    cancelText: 'Ні',
    onOk() {
      console.log('ok');
    },
    onCancel() {
      console.log('ok');
    },
  });
};

const menu = (
  <Menu
    items={[
      {
        label: (
          <div className='dropdown-name'>
            <EditOutlined className='icon-edit' />
            Редагувати
          </div>
        ),
        key: '1',
      },
      {
        label: (
          <div className='dropdown-name' onClick={showDeleteConfirm}>
            <DeleteOutlined className='icon-delete' />
            Видалити
          </div>
        ),
        key: '2',
      },
    ]}
  />
);

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
          type='primary'
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
          <div className='dropdown-container'>
            <Dropdown
              overlay={menu}
              placement='bottomLeft'
              className='dropdown-item'
              trigger={['click']}
            >
              <MoreOutlined className='icon-more' />
            </Dropdown>
          </div>
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
          <div className='dropdown-container'>
            <Dropdown
              overlay={menu}
              placement='bottomLeft'
              className='dropdown-item'
              trigger={['click']}
            >
              <MoreOutlined className='icon-more' />
            </Dropdown>
          </div>
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
          <div className='dropdown-container'>
            <Dropdown
              overlay={menu}
              placement='bottomLeft'
              className='dropdown-item'
              trigger={['click']}
            >
              <MoreOutlined className='icon-more' />
            </Dropdown>
          </div>
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
          <div className='dropdown-container'>
            <Dropdown
              overlay={menu}
              placement='bottomLeft'
              className='dropdown-item'
              trigger={['click']}
            >
              <MoreOutlined className='icon-more' />
            </Dropdown>
          </div>
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
          <div className='dropdown-container'>
            <Dropdown
              overlay={menu}
              placement='bottomLeft'
              className='dropdown-item'
              trigger={['click']}
            >
              <MoreOutlined className='icon-more' />
            </Dropdown>
          </div>
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
